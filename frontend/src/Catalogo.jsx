import { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import { categorias } from "./productos";

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
  filtrosVehiculo,
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

  const [productosAPI, setProductosAPI] = useState([]);
  const [cargandoProductos, setCargandoProductos] = useState(false);
  const [errorProductos, setErrorProductos] = useState("");

  // ==========================================
  // CARGAR PRODUCTOS DESDE LA API
  // ==========================================

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setCargandoProductos(true);
        setErrorProductos("");

        const params = new URLSearchParams();

        if (filtrosVehiculo?.brand) {
          params.set("brand", filtrosVehiculo.brand);
        }

        if (filtrosVehiculo?.model) {
          params.set("model", filtrosVehiculo.model);
        }

        if (filtrosVehiculo?.year) {
          params.set("year", filtrosVehiculo.year);
        }

        const url = `/api/v1/parts${
          params.toString() ? `?${params.toString()}` : ""
        }`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("No se pudieron obtener los repuestos");
        }

        const data = await response.json();

        setProductosAPI(data.parts || []);
      } catch (error) {
        console.error("Error cargando productos:", error);
        setProductosAPI([]);
        setErrorProductos(
          "No se pudieron cargar los repuestos."
        );
      } finally {
        setCargandoProductos(false);
      }
    };

    cargarProductos();
  }, [filtrosVehiculo]);

  // ==========================================
  // PRODUCTOS MOSTRADOS
  // ==========================================

  const productosMostrados = useMemo(() => {
  let lista = [...productosAPI];

  // Convertir las categorías del frontend
  // a las categorías que usa la API
  const categoriasAPI = {
    Frenos: "Brakes",
    Motor: "Engine",
    Suspensión: "Suspension",
    Filtros: "Filters",
    Accesorios: "Accessories",
  };

  // Filtrar por categoría
  if (categoria) {
    const categoriaAPI =
      categoriasAPI[categoria] || categoria;

    lista = lista.filter(
      (p) => p.category === categoriaAPI
    );
  }

  // Filtrar por búsqueda
  if (busqueda.trim()) {
    const q = busqueda.toLowerCase();

    lista = lista.filter((p) =>
      `${p.name} ${p.part_code} ${p.category} ${
        p.compatible_brands?.join(" ") || ""
      } ${p.compatible_models?.join(" ") || ""}`
        .toLowerCase()
        .includes(q)
    );
  }

  // Ordenar
  if (orden === "Menor precio") {
    lista.sort((a, b) => a.price - b.price);
  }

  if (orden === "Mayor precio") {
    lista.sort((a, b) => b.price - a.price);
  }

  return lista;
}, [productosAPI, categoria, busqueda, orden]);

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
                    {filtrosVehiculo?.brand && filtrosVehiculo?.model
                      ? `${filtrosVehiculo.brand} ${filtrosVehiculo.model}${
                          filtrosVehiculo.year
                            ? ` ${filtrosVehiculo.year}`
                            : ""
                        }`
                      : "Sin vehículo seleccionado"}
                  </p>

                  <button
                    type="button"
                    onClick={onHome}
                    className="text-orange-500 text-[9px] font-bold underline"
                  >
                    Cambiar
                  </button>

                </div>

              </div>

              {/* BUSCADOR */}

              <div className="flex w-full lg:max-w-[475px] bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">

                <input
                  value={busqueda}
                  onChange={(e) =>
                    setBusqueda(e.target.value)
                  }
                  type="text"
                  placeholder="Buscar repuesto por nombre, categoría, marca, código..."
                  className="flex-1 px-4 py-4 text-[10px] outline-none"
                />

                <button
                  type="button"
                  className="bg-orange-500 text-white w-14"
                >
                  🔍
                </button>

              </div>

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

              {/* ESTADOS DE CARGA / ERROR */}

              {cargandoProductos && (
                <div className="py-20 text-center text-gray-400 text-sm">
                  Cargando repuestos...
                </div>
              )}

              {errorProductos && !cargandoProductos && (
                <div className="py-20 text-center text-red-400 text-sm">
                  {errorProductos}
                </div>
              )}

              {/* GRID */}

              {!cargandoProductos && !errorProductos && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

                  {productosMostrados.map((producto) => {

                    const cantidad =
                      cantidades[producto.id] || 1;

                    const favorito =
                      esFavorito(producto.id);

                    // Adaptamos los nombres de la API
                    // a los nombres que usa visualmente el catálogo.
                    const productoVisual = {
                      ...producto,
                      nombre: producto.name,
                      codigo: producto.part_code,
                      precio: producto.price,
                      categoria: producto.category,
                      marca:
                        producto.compatible_brands?.join(", ") ||
                        "Compatible",
                      stock: producto.stock,
                      imagen:
                        producto.imagen ||
                        "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=600&auto=format&fit=crop",
                    };

                    return (

                      <div
                        key={producto.id}
                        className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
                      >

                        {/* IMAGEN */}

                        <div className="relative h-[190px] bg-gray-50">

                          <img
                            src={productoVisual.imagen}
                            alt={productoVisual.nombre}
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
                            {productoVisual.marca}
                          </p>

                          <h3 className="text-[11px] font-bold mt-2 leading-tight min-h-[30px]">
                            {productoVisual.nombre}
                          </h3>

                          <p className="text-[9px] text-gray-400 mt-2">
                            Código: {productoVisual.codigo}
                          </p>

                          <p className="text-lg font-black mt-4">
                            $
                            {productoVisual.precio.toLocaleString(
                              "es-UY"
                            )}
                          </p>

                          <p className="text-[9px] text-green-600 font-bold mt-2">
                            En stock · {productoVisual.stock} unidades
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
              )}

              {/* SIN RESULTADOS */}

              {!cargandoProductos &&
                !errorProductos &&
                productosMostrados.length === 0 && (

                  <div className="py-20 text-center text-gray-400 text-sm">
                    No encontramos productos.
                  </div>

                )}

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}