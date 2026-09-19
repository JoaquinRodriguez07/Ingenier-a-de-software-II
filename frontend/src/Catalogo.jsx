import { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import { filtrarRepuestos } from "./filtrarRepuestos";
import { categorias, productos } from "./productos";

export default function Catalogo({
  // ==========================================
  // NAVBAR
  // ==========================================
  usuario,
  onHome,
  onCatalogo,
  onLogin,
  onMarcas,
  onCarrito,
  onFavoritos,

  // MENÚ DE USUARIO
  onPerfil,
  onDirecciones,
  onMetodosPago,
  onHistorial,
  onCerrarSesion,

  // CONTADORES
  cantidadCarrito,
  cantidadFavoritos,

  // ==========================================
  // CATÁLOGO
  // ==========================================
  onDetalle,
  categoriaInicial,
  onAgregarAlCarrito,
  onAlternarFavorito,
  esFavorito,
}) {
  const [categoria, setCategoria] = useState(
    categoriaInicial || "Frenos"
  );

  const [orden, setOrden] = useState("Más relevantes");
  const [busqueda, setBusqueda] = useState("");
  const [cantidades, setCantidades] = useState({});

  // ==========================================
  // ACTUALIZAR CATEGORÍA
  // ==========================================

  useEffect(() => {
    setCategoria(categoriaInicial || "Frenos");
  }, [categoriaInicial]);

  // ==========================================
  // PRODUCTOS MOSTRADOS
  // ==========================================
  // La lógica de búsqueda/filtro/orden vive en filtrarRepuestos.js,
  // separada de este componente. Acá solo le pasamos el array
  // `productos` que tengamos en cada momento: hoy es el import de
  // productos.js, el día de mañana puede ser el resultado de un
  // fetch/useState contra la API. No hace falta tocar nada de esto
  // para que ese cambio funcione.

  const productosMostrados = useMemo(
    () => filtrarRepuestos(productos, { categoria, busqueda, orden }),
    [categoria, busqueda, orden]
  );

  // ==========================================
  // CAMBIAR CANTIDAD
  // ==========================================

  const cambiarCantidad = (id, cambio) => {
    setCantidades((actual) => ({
      ...actual,
      [id]: Math.max(
        1,
        (actual[id] || 1) + cambio
      ),
    }));
  };

  // ==========================================
  // AGREGAR AL CARRITO
  // ==========================================

  const agregar = (producto) => {
    onAgregarAlCarrito(
      producto,
      cantidades[producto.id] || 1
    );

    setCantidades((actual) => ({
      ...actual,
      [producto.id]: 1,
    }));
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* =================================================
          NAVBAR
      ================================================== */}

      <Navbar
        paginaActual="catalogo"

        usuario={usuario}

        onHome={onHome}
        onCatalogo={onCatalogo}
        onLogin={onLogin}
        onMarcas={onMarcas}
        onCarrito={onCarrito}
        onFavoritos={onFavoritos}

        // MENÚ DE USUARIO
        onPerfil={onPerfil}
        onDirecciones={onDirecciones}
        onMetodosPago={onMetodosPago}
        onHistorial={onHistorial}
        onCerrarSesion={onCerrarSesion}

        cantidadCarrito={cantidadCarrito}
        cantidadFavoritos={cantidadFavoritos}
      />

      {/* =================================================
          CONTENIDO
      ================================================== */}

      <main className="pt-[88px]">

        {/* =================================================
            ENCABEZADO
        ================================================== */}

        <section className="bg-[#f5f5f5] px-5 md:px-10 py-7">

          <div className="max-w-[1200px] mx-auto">

            <p className="text-[9px] text-gray-400">
              Inicio › Repuestos › {categoria}
            </p>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mt-5">

              {/* VEHÍCULO */}

              <div className="bg-[#151719] text-white rounded-lg px-5 py-4 min-w-[430px]">

                <p className="text-[9px] text-gray-400">
                  Vehículo seleccionado:
                </p>

                <div className="flex items-center gap-3 mt-1">

                  <span className="text-xl">
                    🚗
                  </span>

                  <p className="text-[14px] font-black">
                    Volkswagen Gol 2019 Highline
                  </p>

                  <button
                    type="button"
                    className="text-orange-500 text-[9px] font-bold underline"
                  >
                    Cambiar
                  </button>

                </div>

              </div>

              {/* BUSCADOR */}

              <SearchBar
                value={busqueda}
                onChange={setBusqueda}
                onSubmit={setBusqueda}
                placeholder="Buscar repuesto por nombre, categoría, marca, código..."
                className="lg:max-w-[475px]"
              />

            </div>

          </div>

        </section>

        {/* =================================================
            CATÁLOGO
        ================================================== */}

        <section className="max-w-[1200px] mx-auto px-5 md:px-10 py-7">

          <div className="grid grid-cols-1 lg:grid-cols-[210px_1fr] gap-7">

            {/* =================================================
                SIDEBAR
            ================================================== */}

            <aside>

              <p className="text-[10px] font-black uppercase mb-4">
                Categorías
              </p>

              <div className="space-y-1">

                {categorias.map((item) => (

                  <button
                    key={item.nombre}
                    type="button"
                    onClick={() =>
                      setCategoria(item.nombre)
                    }
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-md text-left transition ${
                      categoria === item.nombre
                        ? "bg-orange-50 text-orange-500 border-l-2 border-orange-500"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >

                    <span className="text-[10px] font-semibold">
                      {item.nombre}
                    </span>

                    <span className="text-[9px] bg-gray-100 rounded-full px-2 py-1">
                      {item.cantidad}
                    </span>

                  </button>

                ))}

              </div>

              {/* MARCAS */}

              <div className="border-t border-gray-100 mt-5 pt-5">

                <p className="text-[10px] font-black uppercase mb-4">
                  Marca
                </p>

                {[
                  "Bosch",
                  "TRW",
                  "Brembo",
                  "ATE",
                  "Ferodo",
                ].map((marca) => (

                  <label
                    key={marca}
                    className="flex items-center gap-2 py-2 cursor-pointer"
                  >

                    <input
                      type="checkbox"
                      className="accent-orange-500"
                    />

                    <span className="text-[9px] text-gray-600">
                      {marca}
                    </span>

                  </label>

                ))}

              </div>

            </aside>

            {/* =================================================
                PRODUCTOS
            ================================================== */}

            <div>

              {/* ORDEN */}

              <div className="flex items-center justify-between mb-5">

                <p className="text-[11px] font-bold">

                  Mostrando{" "}

                  <span className="text-orange-500">
                    {productosMostrados.length}
                  </span>{" "}

                  resultados

                </p>

                <select
                  value={orden}
                  onChange={(e) =>
                    setOrden(e.target.value)
                  }
                  className="border border-gray-200 rounded-md px-3 py-2 text-[9px] outline-none"
                >

                  <option>
                    Más relevantes
                  </option>

                  <option>
                    Menor precio
                  </option>

                  <option>
                    Mayor precio
                  </option>

                </select>

              </div>

              {/* GRID */}

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

                {productosMostrados.map((producto) => {

                  const cantidad =
                    cantidades[producto.id] || 1;

                  const favorito =
                    esFavorito(producto.id);

                  return (

                    <div
                      key={producto.id}
                      className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
                    >

                      {/* IMAGEN */}

                      <div className="relative h-[190px] bg-gray-50">

                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="w-full h-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            onAlternarFavorito(producto)
                          }
                          className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow-md text-lg ${
                            favorito
                              ? "text-orange-500"
                              : "text-gray-500"
                          }`}
                        >
                          {favorito ? "♥" : "♡"}
                        </button>

                      </div>

                      {/* INFORMACIÓN */}

                      <div className="p-4">

                        <p className="text-[9px] font-black">
                          {producto.marca}
                        </p>

                        <h3 className="text-[11px] font-bold mt-2 leading-tight min-h-[30px]">
                          {producto.nombre}
                        </h3>

                        <p className="text-[9px] text-gray-400 mt-2">
                          Código: {producto.codigo}
                        </p>

                        <p className="text-lg font-black mt-4">
                          $
                          {producto.precio.toLocaleString(
                            "es-UY"
                          )}
                        </p>

                        <p className="text-[9px] text-green-600 font-bold mt-2">
                          En stock · {producto.stock} unidades
                        </p>

                        {/* CANTIDAD + AGREGAR */}

                        <div className="flex items-center justify-between mt-4">

                          <div className="flex border border-gray-200 rounded-md">

                            <button
                              type="button"
                              onClick={() =>
                                cambiarCantidad(
                                  producto.id,
                                  -1
                                )
                              }
                              className="w-7 h-8"
                            >
                              −
                            </button>

                            <span className="w-7 flex items-center justify-center text-[9px]">
                              {cantidad}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                cambiarCantidad(
                                  producto.id,
                                  1
                                )
                              }
                              className="w-7 h-8"
                            >
                              +
                            </button>

                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              agregar(producto)
                            }
                            className="bg-orange-500 hover:bg-orange-600 text-white px-3 h-8 rounded-md text-[8px] font-black"
                          >
                            🛒 AGREGAR
                          </button>

                        </div>

                        {/* DETALLE */}

                        <button
                          type="button"
                          onClick={() =>
                            onDetalle(producto)
                          }
                          className="w-full h-9 mt-2 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-md text-[9px] font-bold transition"
                        >
                          Ver detalle
                        </button>

                      </div>

                    </div>

                  );
                })}

              </div>

              {/* SIN RESULTADOS */}

              {productosMostrados.length === 0 && (

                <div className="py-20 text-center text-gray-400 text-sm">
                  {busqueda.trim() ? (
                    <>
                      No encontramos repuestos para{" "}
                      <span className="font-bold text-gray-500">
                        “{busqueda.trim()}”
                      </span>
                      . Probá con otro nombre o código.
                    </>
                  ) : (
                    "No encontramos productos."
                  )}
                </div>

              )}

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}