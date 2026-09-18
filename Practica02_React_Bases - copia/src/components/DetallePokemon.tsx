import { useEffect, useState } from 'react';

interface Props {
  nombre: string;
  url: string;
  onVolver: () => void;
}

interface DatosPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number | null;
  sprites: {
    front_default: string | null;
    other: { 'official-artwork': { front_default: string | null } };
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string }; is_hidden: boolean }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

const nombresEstadisticas: Record<string, string> = {
  hp: 'Vida (HP)',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'Ataque especial',
  'special-defense': 'Defensa especial',
  speed: 'Velocidad',
};

export default function DetallePokemon({ nombre, url, onVolver }: Props) {
  const [pokemon, setPokemon] = useState<DatosPokemon | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [intento, setIntento] = useState(0);

  // Al abrir esta ficha consultamos la URL del Pokémon seleccionado.
  useEffect(() => {
    const controlador = new AbortController();

    async function obtenerDetalle() {
      setCargando(true);
      setError('');
      setPokemon(null);
      try {
        const respuesta = await fetch(url, { signal: controlador.signal });
        if (!respuesta.ok) throw new Error('No se pudo consultar el Pokémon');
        const datos = await respuesta.json();
        setPokemon(datos);
      } catch {
        if (!controlador.signal.aborted) {
          setError('No se pudieron cargar los detalles. Revisa tu conexión e intenta nuevamente.');
        }
      } finally {
        if (!controlador.signal.aborted) setCargando(false);
      }
    }

    obtenerDetalle();
    // Si regresamos a la lista antes de terminar, cancelamos la consulta.
    return () => controlador.abort();
  }, [url, intento]);

  return (
    <section className="mt-8" aria-label={`Detalles de ${nombre}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Detalles de <span className="capitalize">{nombre}</span></h2>
        <button onClick={onVolver} className="px-4 py-2 bg-white border border-slate-300 rounded shadow-sm hover:bg-slate-50 cursor-pointer">
          ← Volver a la lista
        </button>
      </div>

      {cargando && <p className="p-6 bg-white rounded-lg text-slate-600" role="status">Cargando los datos de {nombre}...</p>}

      {error && (
        <div className="p-5 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700" role="alert">{error}</p>
          <button onClick={() => setIntento(intento + 1)} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">Reintentar</button>
        </div>
      )}

      {!cargando && pokemon && (
        <div className="p-4 sm:p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-5 text-center self-start">
              <p className="text-left text-sm text-slate-500">N.º {pokemon.id}</p>
              {(pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default) ? (
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default || ''}
                  alt={pokemon.name}
                  className="w-48 h-48 object-contain mx-auto my-3"
                />
              ) : <p className="my-8 text-slate-500">Imagen no disponible</p>}
              <h3 className="text-2xl font-bold text-slate-800 capitalize">{pokemon.name}</h3>
              <p className="text-sm text-slate-600 mt-3 mb-2">Tipo</p>
              <div className="flex flex-wrap justify-center gap-2">
                {pokemon.types.map((tipo) => (
                  <span key={tipo.type.name} className="px-3 py-1 bg-green-100 text-green-800 rounded capitalize">{tipo.type.name}</span>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              {/* La API entrega la altura en decímetros y el peso en hectogramos. */}
              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded text-center">
                  <dt className="text-sm text-slate-500">Altura</dt>
                  <dd className="font-semibold text-slate-800 mt-1">{pokemon.height / 10} m</dd>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded text-center">
                  <dt className="text-sm text-slate-500">Peso</dt>
                  <dd className="font-semibold text-slate-800 mt-1">{pokemon.weight / 10} kg</dd>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded text-center">
                  <dt className="text-sm text-slate-500">Experiencia base</dt>
                  <dd className="font-semibold text-slate-800 mt-1">{pokemon.base_experience ?? 'No disponible'}</dd>
                </div>
              </dl>

              <h3 className="font-semibold text-slate-800 mb-2">Habilidades</h3>
              <ul className="flex flex-wrap gap-2 mb-5">
                {pokemon.abilities.map((habilidad) => (
                  <li key={habilidad.ability.name} className="bg-blue-50 text-blue-800 rounded px-3 py-1">
                    <span className="capitalize">{habilidad.ability.name.replaceAll('-', ' ')}</span>
                    {habilidad.is_hidden && <span className="text-xs"> (oculta)</span>}
                  </li>
                ))}
              </ul>

              <h3 className="font-semibold text-slate-800 mb-3">Estadísticas base</h3>
              <div className="space-y-3">
                {pokemon.stats.map((estadistica) => (
                  <div key={estadistica.stat.name}>
                    <div className="flex justify-between text-sm text-slate-600 mb-1">
                      <label htmlFor={`stat-${estadistica.stat.name}`}>{nombresEstadisticas[estadistica.stat.name] || estadistica.stat.name}</label>
                      <span className="font-semibold">{estadistica.base_stat}</span>
                    </div>
                    <progress id={`stat-${estadistica.stat.name}`} value={estadistica.base_stat} max={255} className="block w-full h-2" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3">Las barras usan una escala de 0 a 255.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
