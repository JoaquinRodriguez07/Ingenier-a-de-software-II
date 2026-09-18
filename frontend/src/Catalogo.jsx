import { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import { categorias, productos } from "./productos";

export default function Catalogo({
  onHome, onLogin, onMarcas, onDetalle, onCarrito,
  onFavoritos, cantidadCarrito, cantidadFavoritos,
  categoriaInicial, onAgregarAlCarrito, onAlternarFavorito, esFavorito,
}) {
  const [categoria, setCategoria] = useState(categoriaInicial || "Frenos");
  const [orden, setOrden] = useState("Más relevantes");
  const [busqueda, setBusqueda] = useState("");
  const [cantidades, setCantidades] = useState({});

  useEffect(() => {
    setCategoria(categoriaInicial || "Frenos");
  }, [categoriaInicial]);

  const productosMostrados = useMemo(() => {
    let lista = productos.filter((p) => p.categoria === categoria);
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase();
      lista = productos.filter((p) =>
        `${p.nombre} ${p.marca} ${p.codigo} ${p.categoria}`.toLowerCase().includes(q)
      );
    }
    if (orden === "Menor precio") lista.sort((a, b) => a.precio - b.precio);
    if (orden === "Mayor precio") lista.sort((a, b) => b.precio - a.precio);
    return lista;
  }, [categoria, busqueda, orden]);

  const cambiarCantidad = (id, cambio) => {
    setCantidades((actual) => ({
      ...actual,
      [id]: Math.max(1, (actual[id] || 1) + cambio),
    }));
  };

  const agregar = (producto) => {
    onAgregarAlCarrito(producto, cantidades[producto.id] || 1);
    setCantidades((actual) => ({ ...actual, [producto.id]: 1 }));
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar
        paginaActual="catalogo"
        onHome={onHome} onCatalogo={() => {}} onLogin={onLogin}
        onMarcas={onMarcas} onCarrito={onCarrito} onFavoritos={onFavoritos}
        cantidadCarrito={cantidadCarrito} cantidadFavoritos={cantidadFavoritos}
      />

      <main className="pt-[88px]">
        <section className="bg-[#f5f5f5] px-5 md:px-10 py-7">
          <div className="max-w-[1200px] mx-auto">
            <p className="text-[9px] text-gray-400">Inicio › Repuestos › {categoria}</p>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mt-5">
              <div className="bg-[#151719] text-white rounded-lg px-5 py-4 min-w-[430px]">
                <p className="text-[9px] text-gray-400">Vehículo seleccionado:</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xl">🚗</span>
                  <p className="text-[14px] font-black">Volkswagen Gol 2019 Highline</p>
                  <button className="text-orange-500 text-[9px] font-bold underline">Cambiar</button>
                </div>
              </div>
              <div className="flex w-full lg:max-w-[475px] bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} type="text"
                  placeholder="Buscar repuesto por nombre, categoría, marca, código..."
                  className="flex-1 px-4 py-4 text-[10px] outline-none" />
                <button className="bg-orange-500 text-white w-14">🔍</button>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-5 md:px-10 py-7">
          <div className="grid grid-cols-1 lg:grid-cols-[210px_1fr] gap-7">
            <aside>
              <p className="text-[10px] font-black uppercase mb-4">Categorías</p>
              <div className="space-y-1">
                {categorias.map((item) => (
                  <button key={item.nombre} type="button" onClick={() => setCategoria(item.nombre)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-md text-left transition ${
                      categoria === item.nombre ? "bg-orange-50 text-orange-500 border-l-2 border-orange-500" : "hover:bg-gray-50 text-gray-700"
                    }`}>
                    <span className="text-[10px] font-semibold">{item.nombre}</span>
                    <span className="text-[9px] bg-gray-100 rounded-full px-2 py-1">{item.cantidad}</span>
                  </button>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-5 pt-5">
                <p className="text-[10px] font-black uppercase mb-4">Marca</p>
                {["Bosch", "TRW", "Brembo", "ATE", "Ferodo"].map((marca) => (
                  <label key={marca} className="flex items-center gap-2 py-2 cursor-pointer">
                    <input type="checkbox" className="accent-orange-500" />
                    <span className="text-[9px] text-gray-600">{marca}</span>
                  </label>
                ))}
              </div>
            </aside>

            <div>
              <div className="flex items-center justify-between mb-5">
                <p className="text-[11px] font-bold">Mostrando <span className="text-orange-500">{productosMostrados.length}</span> resultados</p>
                <select value={orden} onChange={(e) => setOrden(e.target.value)}
                  className="border border-gray-200 rounded-md px-3 py-2 text-[9px] outline-none">
                  <option>Más relevantes</option><option>Menor precio</option><option>Mayor precio</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {productosMostrados.map((producto) => {
                  const cantidad = cantidades[producto.id] || 1;
                  const favorito = esFavorito(producto.id);
                  return (
                    <div key={producto.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition">
                      <div className="relative h-[190px] bg-gray-50">
                        <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover" />
                        <button onClick={() => onAlternarFavorito(producto)}
                          className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow-md text-lg ${favorito ? "text-orange-500" : "text-gray-500"}`}>
                          {favorito ? "♥" : "♡"}
                        </button>
                      </div>
                      <div className="p-4">
                        <p className="text-[9px] font-black">{producto.marca}</p>
                        <h3 className="text-[11px] font-bold mt-2 leading-tight min-h-[30px]">{producto.nombre}</h3>
                        <p className="text-[9px] text-gray-400 mt-2">Código: {producto.codigo}</p>
                        <p className="text-lg font-black mt-4">${producto.precio.toLocaleString("es-UY")}</p>
                        <p className="text-[9px] text-green-600 font-bold mt-2">En stock · {producto.stock} unidades</p>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex border border-gray-200 rounded-md">
                            <button onClick={() => cambiarCantidad(producto.id, -1)} className="w-7 h-8">−</button>
                            <span className="w-7 flex items-center justify-center text-[9px]">{cantidad}</span>
                            <button onClick={() => cambiarCantidad(producto.id, 1)} className="w-7 h-8">+</button>
                          </div>
                          <button onClick={() => agregar(producto)} className="bg-orange-500 hover:bg-orange-600 text-white px-3 h-8 rounded-md text-[8px] font-black">🛒 AGREGAR</button>
                        </div>
                        <button onClick={() => onDetalle(producto)}
                          className="w-full h-9 mt-2 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-md text-[9px] font-bold transition">
                          Ver detalle
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {productosMostrados.length === 0 && (
                <div className="py-20 text-center text-gray-400 text-sm">No encontramos productos.</div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
