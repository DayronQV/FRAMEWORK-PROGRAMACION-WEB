import { useState } from 'react';
import TarjetaUsuario from './components/TarjetaUsuario';
import TarjetaPokemon from './components/TarjetaPokemon';
import DetallePokemon from './components/DetallePokemon';

interface Usuario {
  name: string;
  email: string;
  phone: string;
}

interface Pokemon {
  name: string;
  url: string;
}

export default function App() {
  // Solo mostramos la sección que el usuario eligió con los botones.
  const [vista, setVista] = useState<'usuario' | 'pokemon' | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState<boolean>(false);

  const [pokemones, setPokemones] = useState<Pokemon[]>([]);
  const [cargandoPokemon, setCargandoPokemon] = useState<boolean>(false);
  const [errorPokemon, setErrorPokemon] = useState<string>('');
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState<Pokemon | null>(null);

  const obtenerDatos = async () => {
    setVista('usuario');
    setCargando(true);
    try {
      const respuesta = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const datos = await respuesta.json();
      setUsuario(datos);
    } catch (error) {
      console.error("Error al consumir la API", error);
    } finally {
      setCargando(false);
    }
  };

  // Consultamos la API de Pokémon igual que en el ejemplo del usuario.
  const obtenerPokemon = async () => {
    setVista('pokemon');
    setPokemonSeleccionado(null);
    if (pokemones.length > 0) return;
    setCargandoPokemon(true);
    setErrorPokemon('');
    try {
      const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      if (!respuesta.ok) {
        throw new Error('No se pudieron obtener los Pokémon');
      }
      const datos = await respuesta.json();
      // La lista de Pokémon viene dentro de la propiedad results.
      setPokemones(datos.results);
    } catch (error) {
      console.error("Error al consumir la API de Pokémon", error);
      setErrorPokemon('No se pudieron cargar los Pokémon. Intenta nuevamente.');
    } finally {
      setCargandoPokemon(false);
    }
  };

  const volverAlInicio = () => {
    setVista(null);
    setPokemonSeleccionado(null);
  };

  if (vista === null) {
    return (
      <main className="min-h-screen bg-amber-50 p-4 sm:p-8">
        <div className="max-w-2xl mx-auto pt-10 sm:pt-20">
          <div className="bg-white border border-amber-200 rounded-xl shadow-sm p-6 sm:p-8">
            <p className="text-sm font-semibold text-amber-700 mb-2">PRÁCTICA DE REACT</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Fundamentos de React</h1>
            <p className="text-slate-600 mt-3 mb-6">
              Elige la pantalla que deseas consultar.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <button
                onClick={obtenerDatos}
                disabled={cargando}
                className="bg-blue-600 text-white px-5 py-4 rounded-lg shadow-sm hover:bg-blue-700 disabled:opacity-60 transition-colors cursor-pointer"
              >
                {cargando ? 'Consultando API...' : 'Obtener Usuario'}
              </button>
              <button
                onClick={obtenerPokemon}
                disabled={cargandoPokemon}
                className="bg-green-600 text-white px-5 py-4 rounded-lg shadow-sm hover:bg-green-700 disabled:opacity-60 transition-colors cursor-pointer"
              >
                {cargandoPokemon ? 'Consultando API...' : 'Obtener Pokémon'}
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (vista === 'usuario') {
    return (
      <main className="min-h-screen bg-blue-50 p-4 sm:p-8">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={volverAlInicio}
            className="mb-6 px-4 py-2 bg-white border border-blue-200 text-blue-700 rounded-lg shadow-sm hover:bg-blue-100 cursor-pointer"
          >
            ← Volver al inicio
          </button>

          <section className="bg-white/70 border border-blue-200 rounded-xl p-6 sm:p-8">
            <p className="text-sm font-semibold text-blue-700 mb-2">PANTALLA DE USUARIO</p>
            <h1 className="text-2xl font-bold text-slate-800">Datos del usuario</h1>
            <p className="text-slate-600 mt-2">Información obtenida desde la API.</p>

            {cargando && <p className="mt-6 text-slate-600" role="status">Cargando usuario...</p>}

            {!cargando && usuario && (
              <TarjetaUsuario nombre={usuario.name} correo={usuario.email} phone={usuario.phone} />
            )}
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 sm:p-8 bg-green-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={volverAlInicio}
          className="mb-6 px-4 py-2 bg-white border border-green-200 text-green-700 rounded-lg shadow-sm hover:bg-green-100 cursor-pointer"
        >
          ← Volver al inicio
        </button>

        <section className="bg-white/70 border border-green-200 rounded-xl p-5 sm:p-7">
          <p className="text-sm font-semibold text-green-700 mb-2">PANTALLA DE POKÉMON</p>

          {cargandoPokemon && <p className="text-slate-600" role="status">Cargando Pokémon...</p>}

          {errorPokemon && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700" role="alert">{errorPokemon}</p>
              <button onClick={obtenerPokemon} className="mt-3 px-4 py-2 bg-green-600 text-white rounded cursor-pointer">
                Reintentar
              </button>
            </div>
          )}

          {pokemonSeleccionado ? (
            <DetallePokemon
              nombre={pokemonSeleccionado.name}
              url={pokemonSeleccionado.url}
              onVolver={() => setPokemonSeleccionado(null)}
            />
          ) : pokemones.length > 0 && (
            <div className="mt-2">
              <h2 className="text-xl font-semibold text-slate-900">Lista de Pokémon</h2>
              <p className="text-sm text-slate-500 mt-1 mb-4">{pokemones.length} Pokémon cargados. Pulsa una tarjeta para ver sus datos.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {pokemones.map((pokemon) => (
                  <TarjetaPokemon
                    key={pokemon.url}
                    nombre={pokemon.name}
                    url={pokemon.url}
                    onSeleccionar={() => setPokemonSeleccionado(pokemon)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
