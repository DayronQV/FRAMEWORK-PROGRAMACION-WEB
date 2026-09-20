const MiRed = () => {
  const referidos = [
    { id: 1, nombre: "Ana García", nivel: "Nivel 1", ventas: "$1,200" },
    { id: 2, nombre: "Luis Poveda", nivel: "Nivel 1", ventas: "$850" },
    { id: 3, nombre: "Marta Sánchez", nivel: "Nivel 2", ventas: "$430" },
  ];

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">
        Mi Red de Referidos
      </h1>

      <div role="region" aria-label="Tabla de referidos; desliza para ver todas las columnas" tabIndex={0} className="max-w-full overflow-x-auto bg-white rounded-lg border border-slate-200 shadow-sm focus-visible:outline-2 focus-visible:outline-indigo-600">
        <table className="w-full min-w-[440px] text-left text-sm sm:text-base">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-3 sm:p-4 font-semibold text-slate-600">Nombre</th>
              <th className="p-3 sm:p-4 font-semibold text-slate-600">Jerarquía</th>
              <th className="p-3 sm:p-4 font-semibold text-slate-600">
                Ventas Mensuales
              </th>
            </tr>
          </thead>

          <tbody>
            {referidos.map((ref) => (
              <tr
                key={ref.id}
                className="border-b border-slate-100 hover:bg-slate-50"
              >
                <td className="p-3 sm:p-4 text-slate-700">{ref.nombre}</td>
                <td className="p-3 sm:p-4 text-slate-500">{ref.nivel}</td>
                <td className="p-3 sm:p-4 text-indigo-600 font-medium">
                  {ref.ventas}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MiRed;
