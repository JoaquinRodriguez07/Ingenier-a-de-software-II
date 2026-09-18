export default function Navbar({
  paginaActual,
  onHome,
  onCatalogo,
  onLogin,
  onMarcas,
  onCarrito,
  onFavoritos,
  cantidadCarrito = 0,
}) {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-[1085px] h-14 bg-white rounded-xl shadow-xl px-5 md:px-6 flex items-center justify-between">

      {/* LOGO */}
      <button
        type="button"
        onClick={onHome}
        className="flex items-center cursor-pointer"
      >
        <img
          src="/src/assets/logo.png"
          alt="AutoBought"
          className="h-10 w-auto object-contain"
        />
      </button>

      {/* NAVEGACIÓN */}
      <div className="hidden md:flex items-center gap-9 ml-8">

        {/* HOME */}
        <button
          type="button"
          onClick={onHome}
          className={`text-[11px] font-semibold transition ${
            paginaActual === "home"
              ? "text-orange-500"
              : "text-gray-800 hover:text-orange-500"
          }`}
        >
          Home
        </button>

        {/* MARCAS */}
        <button
          type="button"
          onClick={onMarcas}
          className={`text-[11px] font-semibold transition ${
            paginaActual === "marcas"
              ? "text-orange-500"
              : "text-gray-800 hover:text-orange-500"
          }`}
        >
          Marcas
        </button>

        {/* REPUESTOS */}
        <button
          type="button"
          onClick={() => onCatalogo("Frenos")}
          className={`text-[11px] font-semibold transition ${
            paginaActual === "catalogo" || paginaActual === "detalle"
              ? "text-orange-500"
              : "text-gray-800 hover:text-orange-500"
          }`}
        >
          Repuestos
        </button>

      </div>

      {/* ICONOS DERECHA */}
      <div className="flex items-center gap-5 text-gray-700">

        {/* USUARIO */}
        <button
          type="button"
          onClick={onLogin}
          className={`transition ${
            paginaActual === "login"
              ? "text-orange-500"
              : "hover:text-orange-500"
          }`}
          title="Iniciar sesión"
        >
          <svg
            className="w-[20px] h-[20px]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </button>

        {/* FAVORITOS */}
        <button
          type="button"
          onClick={onFavoritos}
          className={`relative transition ${
            paginaActual === "favoritos"
              ? "text-orange-500"
              : "hover:text-orange-500"
          }`}
          title="Favoritos"
        >
          <span className="text-[21px] leading-none">
            {paginaActual === "favoritos" ? "♥" : "♡"}
          </span>
        </button>

        {/* CARRITO */}
        <button
          type="button"
          onClick={onCarrito}
          className={`relative transition ${
            paginaActual === "carrito"
              ? "text-orange-500"
              : "hover:text-orange-500"
          }`}
          title="Carrito"
        >
          <svg
            className="w-[20px] h-[20px]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
              d="M3 3h2l2.4 11.5a2 2 0 002 1.5h7.8a2 2 0 001.9-1.4L21 7H6"
            />

            <circle
              cx="10"
              cy="20"
              r="1.2"
            />

            <circle
              cx="18"
              cy="20"
              r="1.2"
            />
          </svg>

          {/* CONTADOR DEL CARRITO */}
          {cantidadCarrito > 0 && (
            <span className="absolute -top-2 -right-2 min-w-4 h-4 px-1 bg-orange-500 text-white rounded-full text-[8px] flex items-center justify-center font-bold">
              {cantidadCarrito}
            </span>
          )}
        </button>

      </div>
    </nav>
  );
}