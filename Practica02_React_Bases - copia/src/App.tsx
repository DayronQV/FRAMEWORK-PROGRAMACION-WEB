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

  return (
    <div className="p-4 sm:p-8 bg-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-slate-800">Fundamentos de React</h1>
      <p className="text-slate-600 mb-5">Consulta los datos de un usuario o descubre los 151 Pokémon.</p>
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={obtenerDatos}
          aria-pressed={vista === 'usuario'}
          disabled={cargando}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-all cursor-pointer"
        >
          {cargando ? 'Consultando API...' : 'Obtener Usuario'}
        </button>
        <button
          onClick={obtenerPokemon}
          aria-pressed={vista === 'pokemon'}
          disabled={cargandoPokemon}
          className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition-all cursor-pointer"
        >
          {cargandoPokemon ? 'Consultando API...' : 'Obtener Pokémon'}
        </button>
      </div>

      {vista === 'usuario' && cargando && <p className="mt-4 text-slate-600" role="status">Cargando usuario...</p>}

      {vista === 'usuario' && usuario && (
        <TarjetaUsuario nombre={usuario.name} correo={usuario.email} phone={usuario.phone} />
      )}

      {vista === 'pokemon' && cargandoPokemon && <p className="mt-4 text-slate-600" role="status">Cargando Pokémon...</p>}

      {vista === 'pokemon' && errorPokemon && <p className="mt-4 text-red-600" role="alert">{errorPokemon}</p>}

      {vista === 'pokemon' && (pokemonSeleccionado ? (
        <DetallePokemon
          nombre={pokemonSeleccionado.name}
          url={pokemonSeleccionado.url}
          onVolver={() => setPokemonSeleccionado(null)}
        />
      ) : pokemones.length > 0 && (
        <div className="mt-8">
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
      ))}
      </div>
    </div>
  );
}
