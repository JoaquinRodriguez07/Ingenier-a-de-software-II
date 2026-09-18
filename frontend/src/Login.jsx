import { useState } from "react";
import Navbar from "./Navbar";

export default function Login({
  onHome,
  onCatalogo,
  onLogin,
  onMarcas,
  onCarrito,
  onFavoritos,
  cantidadCarrito,
  cantidadFavoritos,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col font-sans"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.72)), url('/src/assets/respuestos.jpg')",
      }}
    >

      {/* =====================================================
          NAVBAR
      ====================================================== */}

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

      {/* =====================================================
          CONTENIDO PRINCIPAL
      ====================================================== */}

      <main className="min-h-screen flex items-center justify-center px-5 pt-24 pb-10">

        <div className="w-full max-w-[850px] min-h-[500px] bg-white rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">

          {/* =================================================
              FORMULARIO
          ================================================== */}

          <div className="p-8 md:p-12 flex flex-col justify-center">

            {/* TITULO */}

            <p className="text-orange-500 text-[9px] font-black tracking-[4px]">
              AUTOBOUGHT
            </p>

            <h1 className="text-3xl font-black italic uppercase mt-2">
              INICIAR SESIÓN
            </h1>

            <p className="text-gray-400 text-[10px] mt-3">
              Accedé a tu cuenta para continuar.
            </p>

            {/* =================================================
                EMAIL
            ================================================== */}

            <div className="mt-8">

              <label className="text-[9px] font-bold text-gray-700">
                CORREO ELECTRÓNICO
              </label>

              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full mt-2 h-11 px-4 bg-gray-50 border border-gray-200 rounded-md text-[10px] outline-none focus:border-orange-500 transition"
              />

            </div>

            {/* =================================================
                CONTRASEÑA
            ================================================== */}

            <div className="mt-5">

              <div className="flex justify-between items-center">

                <label className="text-[9px] font-bold text-gray-700">
                  CONTRASEÑA
                </label>

                <button
                  type="button"
                  className="text-[8px] text-orange-500 font-bold hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>

              </div>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full mt-2 h-11 px-4 pr-12 bg-gray-50 border border-gray-200 rounded-md text-[10px] outline-none focus:border-orange-500 transition"
                />

                {/* MOSTRAR / OCULTAR */}

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-[20px] text-gray-400 hover:text-orange-500 transition"
                >
                  {showPassword ? "◉" : "○"}
                </button>

              </div>

            </div>

            {/* =================================================
                RECORDAR
            ================================================== */}

            <label className="flex items-center gap-2 mt-5 cursor-pointer">

              <input
                type="checkbox"
                checked={remember}
                onChange={(e) =>
                  setRemember(e.target.checked)
                }
                className="accent-orange-500"
              />

              <span className="text-[9px] text-gray-500">
                Recordarme
              </span>

            </label>

            {/* =================================================
                BOTÓN LOGIN
            ================================================== */}

            <button
              type="button"
              className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-[10px] font-black mt-6 transition"
            >
              INICIAR SESIÓN
            </button>

            {/* =================================================
                SEPARADOR
            ================================================== */}

            <div className="flex items-center gap-3 my-6">

              <div className="flex-1 h-px bg-gray-200" />

              <span className="text-[8px] text-gray-400">
                O
              </span>

              <div className="flex-1 h-px bg-gray-200" />

            </div>

            {/* =================================================
                REGISTRO
            ================================================== */}

            <p className="text-center text-[9px] text-gray-500">

              ¿Todavía no tenés una cuenta?

              <button
                type="button"
                className="text-orange-500 font-bold ml-1 hover:underline"
              >
                Registrate
              </button>

            </p>

          </div>

          {/* =================================================
              PANEL DERECHO / IMAGEN
          ================================================== */}

          <div className="hidden md:block relative overflow-hidden">

            <img
              src="/src/assets/respuestos.jpg"
              alt="AutoBought"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* OSCURECER IMAGEN */}

            <div className="absolute inset-0 bg-black/45" />

            {/* DEGRADADO */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* =================================================
                TEXTO SOBRE LA IMAGEN
            ================================================== */}

            <div className="absolute bottom-10 left-8 right-8">

              <p className="text-orange-500 text-[9px] font-black tracking-[4px]">
                REPUESTOS PARA SEGUIR AVANZANDO
              </p>

              <h2 className="text-white text-3xl font-black italic uppercase mt-3 leading-none">
                CALIDAD.
                <br />
                MOVIMIENTO.
                <br />
                CONFIANZA.
              </h2>

              <div className="w-10 h-[2px] bg-orange-500 mt-5" />

              <p className="text-white/60 text-[9px] mt-4">
                Siempre contigo.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}