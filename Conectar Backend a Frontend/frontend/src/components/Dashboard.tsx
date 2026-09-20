const Dashboard = () => {
  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">
        Resumen General
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        <div className="min-w-0 bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500 uppercase font-semibold">
            Ventas Totales
          </p>
          <p className="break-words text-2xl sm:text-3xl font-bold text-indigo-600">$12,450.00</p>
        </div>
        <div className="min-w-0 bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500 uppercase font-semibold">
            Referidos Activos
          </p>
          <p className="break-words text-2xl sm:text-3xl font-bold text-indigo-600">24</p>
        </div>
        <div className="min-w-0 bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500 uppercase font-semibold">
            Nivel Actual
          </p>
          <p className="break-words text-2xl sm:text-3xl font-bold text-indigo-600">Diamante</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
