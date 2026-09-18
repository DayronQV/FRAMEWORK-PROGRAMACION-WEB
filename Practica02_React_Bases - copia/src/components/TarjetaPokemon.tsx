interface Props {
  nombre: string;
  url: string;
  onSeleccionar: () => void;
}

export default function TarjetaPokemon({ nombre, url, onSeleccionar }: Props) {
  // La URL termina en /pokemon/1/. Tomamos ese número para obtener la imagen.
  const numero = url.split('/').filter(Boolean).pop();
  const imagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${numero}.png`;

  return (
    <button
      type="button"
      onClick={onSeleccionar}
      aria-label={`Ver detalles de ${nombre}`}
      className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm text-center cursor-pointer hover:border-blue-400 focus-visible:outline-2 focus-visible:outline-blue-600"
    >
      <span className="block text-sm text-slate-500 text-left">N.º {numero}</span>
      <span className="block bg-blue-50 rounded-lg my-3 p-2">
        <img src={imagen} alt="" className="w-28 h-28 mx-auto object-contain" loading="lazy" />
      </span>
      <span className="block text-lg font-semibold text-slate-800 capitalize">{nombre}</span>
      <span className="block text-sm text-blue-600 mt-2">Ver detalles</span>
    </button>
  );
}
