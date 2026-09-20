// src/components/Catalogo.tsx
import { useEffect, useState } from 'react';
import { useCart, type Producto } from '../context/CartContext';

const Catalogo = () => {
  const { addToCart } = useCart();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/productos');

        if (!response.ok) {
          throw new Error('Error al consultar productos');
        }

        const data: Producto[] = await response.json();
        setProductos(data);
      } catch {
        setError('No se pudieron cargar los productos');
      } finally {
        setCargando(false);
      }
    };

    void cargarProductos();
  }, []);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">Catálogo de Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
        {productos.map((prod) => (
          <div key={prod.id} className="bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm flex flex-col">
            <img src={prod.img} alt={prod.nombre} className="w-full h-40 object-cover" />
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-semibold text-slate-700">{prod.nombre}</h3>
              <p className="text-indigo-600 font-bold mt-2 mb-4">${prod.precio.toFixed(2)}</p>
              <button
                onClick={() => addToCart(prod)}
                className="mt-auto min-h-11 w-full bg-slate-900 text-white px-2 py-2 rounded text-sm hover:bg-indigo-600 transition"
              >
                Añadir al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;
