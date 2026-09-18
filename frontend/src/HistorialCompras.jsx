import Navbar from "./Navbar";

export default function HistorialCompras({
  onHome,
  onCatalogo,
  onLogin,
  onMarcas,
  onCarrito,
  onFavoritos,
  cantidadCarrito = 0,
  cantidadFavoritos = 0,
  onPerfil,
}) {
  const compras = (() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem("autobought-compras")
        ) || []
      );
    } catch {
      return [];
    }
  })();

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-UY", {
      style: "currency",
      currency: "UYU",
      maximumFractionDigits: 0,
    }).format(Number(precio) || 0);
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "Fecha no disponible";

    return new Date(fecha).toLocaleDateString(
      "es-UY",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-black to-[#492202]">

      <Navbar
        paginaActual="perfil"
        onHome={onHome}
        onCatalogo={onCatalogo}
        onLogin={onLogin}
        onMarcas={onMarcas}
        onCarrito={onCarrito}
        onFavoritos={onFavoritos}
        cantidadCarrito={cantidadCarrito}
        cantidadFavoritos={cantidadFavoritos}
      />

      <main className="min-h-screen flex items-center justify-center px-5 pt-24 pb-10">

        <div className="w-full max-w-[950px] bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* ENCABEZADO */}

          <div className="bg-gray-50 border-b border-gray-200 px-8 md:px-12 py-8">

            <button
              type="button"
              onClick={onPerfil}
              className="text-orange-500 text-[9px] font-bold hover:underline mb-4"
            >
              ← VOLVER A MI PERFIL
            </button>

            <p className="text-orange-500 text-[9px] font-black tracking-[4px]">
              AUTOBOUGHT
            </p>

            <h1 className="text-3xl font-black italic uppercase mt-2 text-gray-900">
              HISTORIAL DE COMPRAS
            </h1>

            <p className="text-gray-400 text-[10px] mt-2">
              Consultá tus compras realizadas anteriormente.
            </p>

          </div>

          {/* CONTENIDO */}

          <div className="p-8 md:p-12">

            {compras.length === 0 ? (

              <div className="text-center py-20">

                <div className="text-4xl mb-5">
                  🛒
                </div>

                <p className="text-gray-500 text-sm font-bold">
                  Todavía no realizaste ninguna compra.
                </p>

                <p className="text-gray-300 text-[9px] mt-2">
                  Cuando realices una compra, aparecerá acá.
                </p>

              </div>

            ) : (

              <div className="space-y-5">

                {compras.map((compra, index) => (

                  <div
                    key={compra.id || index}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >

                    {/* CABECERA COMPRA */}

                    <div className="bg-gray-50 px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                      <div>

                        <p className="text-[8px] text-gray-400 font-bold uppercase">
                          COMPRA
                        </p>

                        <p className="text-sm font-black text-gray-900 mt-1">
                          #{compra.id || `COMP-${index + 1}`}
                        </p>

                      </div>

                      <div>

                        <p className="text-[8px] text-gray-400 font-bold uppercase">
                          FECHA
                        </p>

                        <p className="text-[10px] font-bold text-gray-700 mt-1">
                          {formatearFecha(compra.fecha)}
                        </p>

                      </div>

                      <div>

                        <p className="text-[8px] text-gray-400 font-bold uppercase">
                          ESTADO
                        </p>

                        <span className="inline-block mt-1 text-[8px] font-black bg-green-100 text-green-600 px-3 py-1 rounded">
                          {compra.estado || "REALIZADA"}
                        </span>

                      </div>

                      <div>

                        <p className="text-[8px] text-gray-400 font-bold uppercase">
                          TOTAL
                        </p>

                        <p className="text-lg font-black text-gray-900 mt-1">
                          {formatearPrecio(compra.total)}
                        </p>

                      </div>

                    </div>

                    {/* PRODUCTOS */}

                    <div className="p-6">

                      <p className="text-[9px] font-black text-gray-700 uppercase mb-4">
                        PRODUCTOS
                      </p>

                      <div className="space-y-3">

                        {(compra.productos || []).map(
                          (producto, productoIndex) => (

                            <div
                              key={
                                producto.id ||
                                productoIndex
                              }
                              className="flex items-center justify-between border-b border-gray-100 pb-3"
                            >

                              <div>

                                <p className="text-[10px] font-bold text-gray-800">
                                  {producto.nombre ||
                                    producto.name ||
                                    "Producto"}
                                </p>

                                <p className="text-[8px] text-gray-400 mt-1">
                                  Cantidad:{" "}
                                  {producto.cantidad || 1}
                                </p>

                              </div>

                              <p className="text-[10px] font-black text-gray-900">
                                {formatearPrecio(
                                  (producto.precio || 0) *
                                    (producto.cantidad || 1)
                                )}
                              </p>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </main>

    </div>
  );
}