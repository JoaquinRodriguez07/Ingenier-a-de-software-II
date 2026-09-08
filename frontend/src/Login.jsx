import { useState } from "react";

export default function Login() {
  // Estados de React para controlar la interactividad del formulario
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col font-sans"
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.70), rgba(0,0,0,0.80)), url('https://plus.unsplash.com/premium_photo-1661960487542-352d8c5a69f7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* 
          PASO 1: NAVBAR
       */}
      <nav className="absolute top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-40px)] max-w-[1200px] h-11 bg-white rounded-xl shadow-lg px-5 flex items-center justify-between">
        <div className="flex items-center">
          <div className="font-extrabold italic flex flex-col leading-[0.75]">
            <span className="text-orange-500 text-[25px]">AB</span>
            <span className="text-black text-[9px] tracking-tight">AutoBought</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-9 ml-10">
          <a href="#" className="text-[10px] font-semibold text-gray-800 hover:text-orange-500 transition">Marcas <span>⌄</span></a>
          <a href="#" className="text-[10px] font-semibold text-gray-800 hover:text-orange-500 transition">Repuestos <span>⌄</span></a>
          <a href="#" className="text-[10px] font-semibold text-gray-800 hover:text-orange-500 transition">Buscar Repuesto</a>
        </div>

        <div className="flex items-center gap-4 text-gray-700">
          {/* Icono de Usuario Simplificado */}
          <button className="hover:text-orange-500 transition">
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </button>
          {/* Icono Hamburguesa */}
          <button className="hover:text-orange-500 transition">
            <svg className="w-[19px] h-[19px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </nav>

      {/* 
          PASO 2: CONTENEDOR CENTRAL Y DECORACIONES
       */}
      <main className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden">
        
        <div className="hidden lg:block absolute bottom-12 left-10 text-white/40 text-[8px] tracking-[4px] leading-[1.7]">
          <p>REPUESTOS</p><p>PARA SEGUIR</p><p>AVANZANDO</p>
          <div className="mt-3 w-8 h-[2px] bg-orange-500" />
        </div>

        <div className="hidden lg:block absolute right-10 top-[115px] text-white/40 text-[8px] tracking-[4px] leading-[1.7]">
          <p>CALIDAD</p><p>MOVIMIENTO</p><p>CONFIANZA</p><p>SIEMPRE CONTIGO</p>
          <div className="mt-3 w-8 h-[2px] bg-orange-500" />
        </div>

        <div className="w-full max-w-[575px] h-auto min-h-[390px] flex flex-col md:flex-row overflow-hidden rounded-lg shadow-2xl relative z-10">
          
          {/* =================================================
              PASO 3: FORMULARIO INTERACTIVO (Lado Izquierdo)
          ================================================== */}
          <section className="w-full md:w-[52%] bg-[#f3f3f3] px-7 py-7 text-black">
            
            {/* Título y Bienvenida */}
            <div className="text-center mb-6">
              <p className="text-[8px] text-gray-400 tracking-[4px] uppercase mb-2">BIENVENIDO A</p>
              <div className="inline-flex flex-col items-center font-extrabold italic leading-[0.8]">
                <span className="text-orange-500 text-[39px]">AB</span>
                <span className="text-black text-[19px]">AutoBought</span>
              </div>
              <p className="text-[6px] font-bold text-gray-500 tracking-[2px] mt-1">LA PIEZA QUE TU AUTO NECESITA</p>
            </div>

            <form className="space-y-3">
              {/* Input: Nombre de Usuario */}
              <div>
                <label className="block text-[8px] font-semibold text-gray-800 mb-1">Nombre de Usuario</label>
                <div className="relative flex items-center">
                  <div className="absolute left-2.5 text-gray-400">
                    <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <input type="text" placeholder="Ingresa tu usuario" className="w-full h-[29px] pl-8 pr-3 bg-white border border-gray-300 rounded-[4px] text-[9px] text-gray-800 placeholder:text-gray-400 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition" />
                </div>
              </div>

              {/* Input: Contraseña */}
              <div>
                <label className="block text-[8px] font-semibold text-gray-800 mb-1">Contraseña</label>
                <div className="relative flex items-center">
                  <div className="absolute left-2.5 text-gray-400">
                    <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  
                  {/* El tipo de input cambia dinámicamente según la variable showPassword */}
                  <input type={showPassword ? "text" : "password"} placeholder="Ingresa tu contraseña" className="w-full h-[29px] pl-8 pr-8 bg-white border border-gray-300 rounded-[4px] text-[9px] text-gray-800 placeholder:text-gray-400 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition" />
                  
                  {/* Botón para cambiar el estado del "ojito" */}
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2.5 text-gray-400 hover:text-gray-700 transition">
                    {showPassword ? (
                      <svg className="w-[13px] h-[13px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858-2.41A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.97 9.97 0 01-4.132 5.411M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3l18 18" /></svg>
                    ) : (
                      <svg className="w-[13px] h-[13px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Checkbox Recordarme y Link Olvidaste */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-[11px] h-[11px] accent-orange-500" />
                  <span className="text-[8px] text-gray-600">Recordarme</span>
                </label>
                <button type="button" className="text-[8px] text-orange-500 hover:underline">¿Olvidaste tu contraseña?</button>
              </div>

              {/* Botón Principal */}
              <button type="submit" className="w-full h-[30px] mt-1 flex items-center justify-center gap-1 rounded-[4px] bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-white text-[8px] font-bold tracking-[1px] shadow-sm transition-all">
                INICIAR SESIÓN <span className="text-[12px] leading-none">→</span>
              </button>
            </form>

            {/* Separador de Login Social */}
            <div className="flex items-center gap-2 my-3">
              <div className="h-px bg-gray-300 flex-1" />
              <span className="text-[7px] text-gray-500">o continúa con</span>
              <div className="h-px bg-gray-300 flex-1" />
            </div>

            {/* Botones Sociales */}
            <div className="flex gap-3">
              <button type="button" className="flex-1 h-[26px] bg-transparent border border-gray-300 rounded-[4px] flex items-center justify-center hover:bg-white transition">
                <span className="text-[13px] font-bold text-[#4285F4]">G</span>
              </button>
              <button type="button" className="flex-1 h-[26px] bg-transparent border border-gray-300 rounded-[4px] flex items-center justify-center hover:bg-white transition">
                <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.79 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25C11.88 5.02 13.69 3.18 15.79 3c.29 2.58-2.34 4.5-3.76 4.25z" /></svg>
              </button>
            </div>

            <p className="text-center text-[8px] text-gray-600 mt-4">
              ¿No tenés una cuenta? <button type="button" className="text-orange-500 font-semibold hover:underline">Registrate</button>
            </p>
          </section>

          {/* LADO DERECHO: Panel Decorativo del Auto */}
          <section
            className="hidden md:flex relative w-[48%] bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000')" }}
          >
            <div className="absolute inset-0 bg-black/65" />
            <div className="absolute -right-20 -top-20 w-[115px] h-[600px] bg-orange-500/60 rotate-[27deg]" />
            <div className="absolute right-[50px] -top-20 w-[30px] h-[600px] bg-black/50 rotate-[27deg]" />
            <div className="relative z-10 flex flex-col justify-center px-7">
              <p className="text-orange-500 text-[8px] font-semibold tracking-[4px] leading-[1.7] mb-2">
                MÁS QUE<br />REPUESTOS,
              </p>
              <h2 className="text-white text-[30px] font-black italic leading-[0.9] tracking-tight">
                MOVEMOS<br />TU CAMINO.
              </h2>
              <div className="w-8 h-[2px] bg-orange-500 mt-4" />
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}