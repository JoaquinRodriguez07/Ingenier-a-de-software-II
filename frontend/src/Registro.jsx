import { useState } from "react";
import Navbar from "./Navbar";

export default function Registro({
  onHome,
  onCatalogo,
  onLogin,
  onMarcas,
  onCarrito,
  onFavoritos,
  cantidadCarrito,
  cantidadFavoritos,
  onRegistroExitoso,
}) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const [error, setError] = useState("");

  const registrar = (e) => {
    e.preventDefault();
    setError("");

    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !email.trim() ||
      !telefono.trim() ||
      !password ||
      !confirmarPassword
    ) {
      setError("Completá todos los campos.");
      return;
    }

    if (!email.includes("@")) {
      setError("Ingresá un correo electrónico válido.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!aceptaTerminos) {
      setError("Tenés que aceptar los términos y condiciones.");
      return;
    }

    let usuarios = [];

    try {
      usuarios =
        JSON.parse(localStorage.getItem("autobought-usuarios")) || [];
    } catch {
      usuarios = [];
    }

    const emailExiste = usuarios.some(
      (usuario) =>
        usuario.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (emailExiste) {
      setError("Ya existe una cuenta con ese correo.");
      return;
    }

    const nuevoUsuario = {
      id: Date.now(),
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      email: email.trim().toLowerCase(),
      telefono: telefono.trim(),
      password,
    };

    usuarios.push(nuevoUsuario);

    localStorage.setItem(
      "autobought-usuarios",
      JSON.stringify(usuarios)
    );

    const usuarioSesion = {
      id: nuevoUsuario.id,
      nombre: nuevoUsuario.nombre,
      apellido: nuevoUsuario.apellido,
      email: nuevoUsuario.email,
      telefono: nuevoUsuario.telefono,
    };

    localStorage.setItem(
      "autobought-sesion",
      JSON.stringify(usuarioSesion)
    );

    onRegistroExitoso(usuarioSesion);
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,1), rgb(73, 34, 2))",
      }}
    >
      <Navbar
        paginaActual="login"
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

        <div className="w-full max-w-[900px] bg-white rounded-2xl overflow-hidden shadow-2xl">

          <form
            onSubmit={registrar}
            className="p-8 md:p-12"
          >

            <p className="text-orange-500 text-[9px] font-black tracking-[4px]">
              AUTOBOUGHT
            </p>

            <h1 className="text-3xl font-black italic uppercase mt-2">
              CREAR CUENTA
            </h1>

            <p className="text-gray-400 text-[10px] mt-3">
              Registrate para poder comprar y guardar tus productos.
            </p>

            {error && (
              <div className="mt-5 bg-red-50 border border-red-200 text-red-500 rounded-md px-4 py-3 text-[9px] font-semibold">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">

              <div>
                <label className="text-[9px] font-bold text-gray-700">
                  NOMBRE
                </label>

                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full mt-2 h-11 px-4 bg-gray-50 border border-gray-200 rounded-md text-[10px] outline-none focus:border-orange-500 transition"
                />
              </div>

              <div>
                <label className="text-[9px] font-bold text-gray-700">
                  APELLIDO
                </label>

                <input
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  placeholder="Tu apellido"
                  className="w-full mt-2 h-11 px-4 bg-gray-50 border border-gray-200 rounded-md text-[10px] outline-none focus:border-orange-500 transition"
                />
              </div>

              <div>
                <label className="text-[9px] font-bold text-gray-700">
                  CORREO ELECTRÓNICO
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full mt-2 h-11 px-4 bg-gray-50 border border-gray-200 rounded-md text-[10px] outline-none focus:border-orange-500 transition"
                />
              </div>

              <div>
                <label className="text-[9px] font-bold text-gray-700">
                  TELÉFONO
                </label>

                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="099 123 456"
                  className="w-full mt-2 h-11 px-4 bg-gray-50 border border-gray-200 rounded-md text-[10px] outline-none focus:border-orange-500 transition"
                />
              </div>

              <div>
                <label className="text-[9px] font-bold text-gray-700">
                  CONTRASEÑA
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full mt-2 h-11 px-4 bg-gray-50 border border-gray-200 rounded-md text-[10px] outline-none focus:border-orange-500 transition"
                />
              </div>

              <div>
                <label className="text-[9px] font-bold text-gray-700">
                  CONFIRMAR CONTRASEÑA
                </label>

                <input
                  type="password"
                  value={confirmarPassword}
                  onChange={(e) =>
                    setConfirmarPassword(e.target.value)
                  }
                  placeholder="Repetí tu contraseña"
                  className="w-full mt-2 h-11 px-4 bg-gray-50 border border-gray-200 rounded-md text-[10px] outline-none focus:border-orange-500 transition"
                />
              </div>

            </div>

            <label className="flex items-center gap-2 mt-6 cursor-pointer">

              <input
                type="checkbox"
                checked={aceptaTerminos}
                onChange={(e) =>
                  setAceptaTerminos(e.target.checked)
                }
                className="accent-orange-500"
              />

              <span className="text-[9px] text-gray-500">
                Acepto los términos y condiciones.
              </span>

            </label>

            <button
              type="submit"
              className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-[10px] font-black mt-6 transition"
            >
              CREAR CUENTA
            </button>

            <p className="text-center text-[9px] text-gray-500 mt-6">

              ¿Ya tenés una cuenta?

              <button
                type="button"
                onClick={onLogin}
                className="text-orange-500 font-bold ml-1 hover:underline"
              >
                Iniciá sesión
              </button>

            </p>

          </form>

        </div>

      </main>
    </div>
  );
}