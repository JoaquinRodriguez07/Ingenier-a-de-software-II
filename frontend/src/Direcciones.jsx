import { useState } from "react";
import Navbar from "./Navbar";

export default function Direcciones({
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
  const [direcciones, setDirecciones] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("autobought-direcciones")
      ) || [];
    } catch {
      return [];
    }
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [formulario, setFormulario] = useState({
    nombre: "",
    calle: "",
    numero: "",
    apartamento: "",
    ciudad: "",
    departamento: "",
    codigoPostal: "",
  });

  const guardarDirecciones = (nuevasDirecciones) => {
    setDirecciones(nuevasDirecciones);

    localStorage.setItem(
      "autobought-direcciones",
      JSON.stringify(nuevasDirecciones)
    );
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));
  };

  const agregarDireccion = (e) => {
    e.preventDefault();

    if (
      !formulario.nombre ||
      !formulario.calle ||
      !formulario.numero ||
      !formulario.ciudad ||
      !formulario.departamento
    ) {
      alert("Completá los campos obligatorios.");
      return;
    }

    const nuevaDireccion = {
      id: Date.now(),
      ...formulario,
      principal: direcciones.length === 0,
    };

    guardarDirecciones([
      ...direcciones,
      nuevaDireccion,
    ]);

    setFormulario({
      nombre: "",
      calle: "",
      numero: "",
      apartamento: "",
      ciudad: "",
      departamento: "",
      codigoPostal: "",
    });

    setMostrarFormulario(false);
  };

  const eliminarDireccion = (id) => {
    const nuevasDirecciones = direcciones.filter(
      (direccion) => direccion.id !== id
    );

    guardarDirecciones(nuevasDirecciones);
  };

  const marcarPrincipal = (id) => {
    const nuevasDirecciones = direcciones.map(
      (direccion) => ({
        ...direccion,
        principal: direccion.id === id,
      })
    );

    guardarDirecciones(nuevasDirecciones);
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
              MIS DIRECCIONES
            </h1>

            <p className="text-gray-400 text-[10px] mt-2">
              Administrá las direcciones donde recibir tus compras.
            </p>

          </div>

          {/* CONTENIDO */}

          <div className="p-8 md:p-12">

            {/* BOTÓN AGREGAR */}

            <div className="flex justify-end mb-8">

              <button
                type="button"
                onClick={() =>
                  setMostrarFormulario(!mostrarFormulario)
                }
                className="h-10 px-6 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-[9px] font-black transition"
              >
                {mostrarFormulario
                  ? "CANCELAR"
                  : "+ AGREGAR DIRECCIÓN"}
              </button>

            </div>

            {/* FORMULARIO */}

            {mostrarFormulario && (
              <form
                onSubmit={agregarDireccion}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8"
              >

                <h2 className="text-sm font-black uppercase text-gray-900 mb-5">
                  NUEVA DIRECCIÓN
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>
                    <label className="text-[9px] font-bold text-gray-500">
                      NOMBRE DE LA DIRECCIÓN *
                    </label>

                    <input
                      name="nombre"
                      value={formulario.nombre}
                      onChange={manejarCambio}
                      placeholder="Ej: Casa"
                      className="w-full mt-2 h-11 px-4 bg-white border border-gray-200 rounded-md text-[10px] outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-gray-500">
                      CIUDAD *
                    </label>

                    <input
                      name="ciudad"
                      value={formulario.ciudad}
                      onChange={manejarCambio}
                      placeholder="Ej: Montevideo"
                      className="w-full mt-2 h-11 px-4 bg-white border border-gray-200 rounded-md text-[10px] outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-gray-500">
                      CALLE *
                    </label>

                    <input
                      name="calle"
                      value={formulario.calle}
                      onChange={manejarCambio}
                      placeholder="Ej: Av. Italia"
                      className="w-full mt-2 h-11 px-4 bg-white border border-gray-200 rounded-md text-[10px] outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-gray-500">
                      NÚMERO *
                    </label>

                    <input
                      name="numero"
                      value={formulario.numero}
                      onChange={manejarCambio}
                      placeholder="Ej: 1234"
                      className="w-full mt-2 h-11 px-4 bg-white border border-gray-200 rounded-md text-[10px] outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-gray-500">
                      APARTAMENTO
                    </label>

                    <input
                      name="apartamento"
                      value={formulario.apartamento}
                      onChange={manejarCambio}
                      placeholder="Opcional"
                      className="w-full mt-2 h-11 px-4 bg-white border border-gray-200 rounded-md text-[10px] outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-gray-500">
                      DEPARTAMENTO *
                    </label>

                    <input
                      name="departamento"
                      value={formulario.departamento}
                      onChange={manejarCambio}
                      placeholder="Ej: Montevideo"
                      className="w-full mt-2 h-11 px-4 bg-white border border-gray-200 rounded-md text-[10px] outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-gray-500">
                      CÓDIGO POSTAL
                    </label>

                    <input
                      name="codigoPostal"
                      value={formulario.codigoPostal}
                      onChange={manejarCambio}
                      placeholder="Opcional"
                      className="w-full mt-2 h-11 px-4 bg-white border border-gray-200 rounded-md text-[10px] outline-none focus:border-orange-500"
                    />
                  </div>

                </div>

                <div className="flex justify-end mt-6">

                  <button
                    type="submit"
                    className="h-10 px-6 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-[9px] font-black"
                  >
                    GUARDAR DIRECCIÓN
                  </button>

                </div>

              </form>
            )}

            {/* DIRECCIONES */}

            {direcciones.length === 0 ? (

              <div className="text-center py-16">

                <p className="text-gray-400 text-sm">
                  Todavía no tenés direcciones guardadas.
                </p>

                <p className="text-gray-300 text-[9px] mt-2">
                  Agregá una dirección para utilizarla durante tus compras.
                </p>

              </div>

            ) : (

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {direcciones.map((direccion) => (

                  <div
                    key={direccion.id}
                    className="border border-gray-200 rounded-xl p-6 relative"
                  >

                    {direccion.principal && (
                      <span className="absolute top-4 right-4 text-[7px] font-black bg-orange-100 text-orange-500 px-2 py-1 rounded">
                        PRINCIPAL
                      </span>
                    )}

                    <h3 className="font-black text-gray-900 text-sm uppercase">
                      {direccion.nombre}
                    </h3>

                    <p className="text-[10px] text-gray-600 mt-4">
                      {direccion.calle} {direccion.numero}
                      {direccion.apartamento &&
                        `, Apt. ${direccion.apartamento}`}
                    </p>

                    <p className="text-[10px] text-gray-500 mt-1">
                      {direccion.ciudad}, {direccion.departamento}
                    </p>

                    {direccion.codigoPostal && (
                      <p className="text-[9px] text-gray-400 mt-1">
                        CP: {direccion.codigoPostal}
                      </p>
                    )}

                    <div className="flex gap-3 mt-6">

                      {!direccion.principal && (
                        <button
                          type="button"
                          onClick={() =>
                            marcarPrincipal(direccion.id)
                          }
                          className="text-[8px] text-orange-500 font-bold hover:underline"
                        >
                          MARCAR PRINCIPAL
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          eliminarDireccion(direccion.id)
                        }
                        className="text-[8px] text-red-500 font-bold hover:underline"
                      >
                        ELIMINAR
                      </button>

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