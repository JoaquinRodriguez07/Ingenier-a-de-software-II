import Navbar from "./Navbar";

import AudiLogo from "./assets/Logos Vehiculos/Audi.svg";
import BMWLogo from "./assets/Logos Vehiculos/BMW.png";
import BydLogo from "./assets/Logos Vehiculos/Byd.png";
import CheryLogo from "./assets/Logos Vehiculos/Chery.webp";
import ChevroletLogo from "./assets/Logos Vehiculos/Chevrolet.png";
import CitroenLogo from "./assets/Logos Vehiculos/Citroen.png";
import FiatLogo from "./assets/Logos Vehiculos/Fiat.png";
import GacLogo from "./assets/Logos Vehiculos/Gac.png";
import HyundaiLogo from "./assets/Logos Vehiculos/Hyundai.webp";
import MercedesLogo from "./assets/Logos Vehiculos/Mercedes.png";
import PeugeotLogo from "./assets/Logos Vehiculos/Peugeot.webp";
import RenaultLogo from "./assets/Logos Vehiculos/Renault.png";
import SuzukiLogo from "./assets/Logos Vehiculos/Suzuki.png";
import VolkswagenLogo from "./assets/Logos Vehiculos/Volkswagen.webp";

export default function Home({
  onHome,
  onLogin,
  onCatalogo,
  onMarcas,
  onCarrito,
  onFavoritos,
  cantidadCarrito,
  cantidadFavoritos,
}) {

  /* =========================================================
     CATEGORÍAS
  ========================================================== */

  const categorias = [
    "Motores",
    "Frenos",
    "Suspensión",
    "Transmisión",
    "Electricidad",
    "Filtros",
    "Accesorios",
  ];

  /* =========================================================
     MARCAS
  ========================================================== */

  const marcas = [
    {
      nombre: "Volkswagen",
      logo: "https://cdn.simpleicons.org/volkswagen/000000",
    },
    {
      nombre: "Chevrolet",
      logo: ChevroletLogo,
    },
    {
      nombre: "Fiat",
      logo: FiatLogo,
    },
    {
      nombre: "Renault",
      logo: RenaultLogo,
    },
    {
      nombre: "Ford",
      logo: "https://cdn.simpleicons.org/ford/000000",
    },
    {
      nombre: "Toyota",
      logo: "https://cdn.simpleicons.org/toyota/000000",
    },
    {
      nombre: "Peugeot",
      logo: PeugeotLogo,
    },
    {
      nombre: "Nissan",
      logo: "https://cdn.simpleicons.org/nissan/000000",
    },
  ];

  /* =========================================================
     PRODUCTOS MÁS VENDIDOS
  ========================================================== */

  const productos = [
    {
      marca: "BOSCH",
      nombre: "Pastillas de Freno Delanteras",
      codigo: "BP1234",
      precio: "$2.450",
      categoria: "Frenos",
      imagen:
        "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?q=80&w=600&auto=format&fit=crop",
    },
    {
      marca: "BREMBO",
      nombre: "Discos de Freno Delanteros",
      codigo: "BRD1234",
      precio: "$4.200",
      categoria: "Frenos",
      imagen:
        "https://images.unsplash.com/photo-1504215680853-026ed2a45def?q=80&w=600&auto=format&fit=crop",
    },
    {
      marca: "MANN FILTER",
      nombre: "Filtro de Aire",
      codigo: "MF4587",
      precio: "$1.290",
      categoria: "Filtros",
      imagen:
        "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=600&auto=format&fit=crop",
    },
    {
      marca: "MONROE",
      nombre: "Amortiguador Delantero",
      codigo: "MN7821",
      precio: "$5.890",
      categoria: "Suspensión",
      imagen:
        "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <Navbar
        paginaActual="home"
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
          HERO
      ====================================================== */}

      <section className="relative min-h-[620px] flex items-center overflow-hidden">

        <img
          src="/src/assets/repuestos.jpg"
          alt="Repuestos para vehículos"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/65" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

        <div className="relative z-10 max-w-[1200px] w-full mx-auto px-6 md:px-10 pt-20">

          <div className="max-w-[650px]">

            <p className="text-orange-500 text-[10px] md:text-xs font-black tracking-[5px] mb-5">
              PREMIUM PERFORMANCE PARTS
            </p>

            <h1 className="text-white text-4xl md:text-6xl font-black italic uppercase leading-[0.95]">
              REPUESTOS QUE TE
              <br />
              MANTIENEN EN
              <br />
              MOVIMIENTO
            </h1>

            <p className="text-gray-300 text-sm md:text-base mt-7 max-w-[540px] leading-relaxed">
              Calidad, confianza y las mejores marcas en un solo
              lugar. Encontrá el repuesto exacto para potenciar
              el rendimiento de tu vehículo.
            </p>

            <button
              type="button"
              onClick={() => onCatalogo("Frenos")}
              className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-[11px] font-black transition"
            >
              BUSCAR REPUESTOS →
            </button>

          </div>

          <div className="absolute hidden lg:block right-10 bottom-16 text-white/30 text-[9px] tracking-[5px] leading-[1.8]">
            <p>TU AUTO</p>
            <p>NUESTRA</p>
            <p>PASIÓN</p>
          </div>

        </div>

      </section>

      {/* =====================================================
          SELECTOR DE VEHÍCULO
      ====================================================== */}

      <section className="relative z-20 -mt-10 px-5">

        <div className="max-w-[1050px] mx-auto bg-[#151719] rounded-xl shadow-2xl p-5 md:p-7">

          <div className="flex flex-col md:flex-row md:items-end gap-4">

            <div className="flex-1">

              <p className="text-[9px] text-gray-400 font-bold mb-2">
                MARCA
              </p>

              <select className="w-full bg-white rounded-md px-3 py-3 text-[10px] outline-none">
                <option>Volkswagen</option>
                <option>Chevrolet</option>
                <option>Fiat</option>
                <option>Renault</option>
              </select>

            </div>

            <div className="flex-1">

              <p className="text-[9px] text-gray-400 font-bold mb-2">
                MODELO
              </p>

              <select className="w-full bg-white rounded-md px-3 py-3 text-[10px] outline-none">
                <option>Gol</option>
                <option>Polo</option>
                <option>Nivus</option>
                <option>Virtus</option>
              </select>

            </div>

            <div className="flex-1">

              <p className="text-[9px] text-gray-400 font-bold mb-2">
                AÑO
              </p>

              <select className="w-full bg-white rounded-md px-3 py-3 text-[10px] outline-none">
                <option>2019</option>
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
              </select>

            </div>

            <button
              type="button"
              onClick={() => onCatalogo("Frenos")}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-7 py-3 text-[10px] font-black transition"
            >
              BUSCAR REPUESTOS
            </button>

          </div>

        </div>

      </section>

      {/* =====================================================
          CATEGORÍAS
      ====================================================== */}

      <section className="max-w-[1100px] mx-auto px-6 md:px-10 pt-16">

        <div className="flex items-end justify-between mb-9">

          <div>

            <p className="text-orange-500 text-[9px] font-black tracking-[4px]">
              TODO PARA TU AUTO
            </p>

            <h2 className="text-2xl md:text-3xl font-black italic uppercase mt-2">
              ENCONTRÁ LO QUE NECESITÁS
            </h2>

          </div>

          <button
            type="button"
            onClick={() => onCatalogo("Frenos")}
            className="text-orange-500 text-[10px] font-bold hover:underline"
          >
            Ver todas →
          </button>

        </div>

        {/* CATEGORÍAS */}

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">

          {categorias.map((categoria) => (

            <button
              key={categoria}
              type="button"
              onClick={() => onCatalogo(categoria)}
              className="h-24 bg-white border border-gray-200 rounded-xl hover:border-orange-400 hover:shadow-md hover:-translate-y-1 transition duration-300 flex items-center justify-center"
            >

              <p className="text-[10px] font-bold">
                {categoria}
              </p>

            </button>

          ))}

        </div>

      </section>

      {/* =====================================================
          MARCAS
      ====================================================== */}

      <section className="max-w-[1100px] mx-auto px-6 md:px-10 py-16">

        <div className="flex items-end justify-between mb-7">

          <div>

            <p className="text-orange-500 text-[9px] font-black tracking-[4px]">
              TRABAJAMOS CON
            </p>

            <h2 className="text-2xl font-black italic uppercase mt-1">
              LAS MEJORES MARCAS
            </h2>

          </div>

          <button
            type="button"
            onClick={onMarcas}
            className="text-orange-500 text-[10px] font-bold hover:underline"
          >
            Ver todas →
          </button>

        </div>

        {/* =================================================
            LOGOS
        ================================================== */}

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">

          {marcas.map((marca) => (

            <button
              key={marca.nombre}
              type="button"
              onClick={onMarcas}
              className="h-24 bg-gray-50 border border-gray-100 rounded-lg flex flex-col items-center justify-center hover:bg-white hover:border-orange-300 hover:shadow-md transition duration-300 group"
            >

              {marca.logo ? (

                <div className="h-12 w-24 flex items-center justify-center">

                  <img
                    src={marca.logo}
                    alt={`Logo ${marca.nombre}`}
                    className="max-h-11 max-w-[85px] object-contain group-hover:scale-105 transition duration-300"
                  />

                </div>

              ) : (

                <div className="h-12 flex items-center justify-center">

                  <span className="text-[11px] font-black text-gray-500 group-hover:text-orange-500 transition">
                    {marca.nombre}
                  </span>

                </div>

              )}

              <span className="text-[8px] text-gray-500 font-semibold mt-1">
                {marca.nombre}
              </span>

            </button>

          ))}

        </div>

      </section>

      {/* =====================================================
          MÁS VENDIDOS
      ====================================================== */}

      <section className="max-w-[1150px] mx-auto px-5 md:px-8 pb-16">

        <div className="bg-[#f3f3f3] rounded-2xl p-6 md:p-9">

          <div className="flex items-end justify-between mb-7">

            <div>

              <p className="text-orange-500 text-[9px] font-black tracking-[4px]">
                LO MÁS ELEGIDO
              </p>

              <h2 className="text-2xl md:text-3xl font-black italic uppercase mt-1">
                MÁS VENDIDOS
              </h2>

            </div>

            <button
              type="button"
              onClick={() => onCatalogo("Frenos")}
              className="text-orange-500 text-[10px] font-bold hover:underline"
            >
              Ver más →
            </button>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {productos.map((producto) => (

              <div
                key={producto.codigo}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition"
              >

                <div className="h-48 bg-gray-100 overflow-hidden">

                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-cover"
                  />

                </div>

                <div className="p-4">

                  <p className="text-[9px] text-orange-500 font-black">
                    {producto.marca}
                  </p>

                  <h3 className="text-[12px] font-bold mt-1">
                    {producto.nombre}
                  </h3>

                  <p className="text-[9px] text-gray-400 mt-1">
                    Código: {producto.codigo}
                  </p>

                  <p className="text-lg font-black mt-4">
                    {producto.precio}
                  </p>

                  <button
                    type="button"
                    onClick={() => onCatalogo(producto.categoria)}
                    className="w-full mt-3 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-md py-2 text-[9px] font-bold transition"
                  >
                    VER REPUESTOS
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          BENEFICIOS
      ====================================================== */}

      <section className="bg-[#151719]">

        <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <p className="text-orange-500 text-xl">✓</p>

            <h3 className="text-white text-[11px] font-black mt-2">
              REPUESTOS DE CALIDAD
            </h3>

            <p className="text-gray-500 text-[9px] mt-2">
              Trabajamos con marcas reconocidas.
            </p>
          </div>

          <div>
            <p className="text-orange-500 text-xl">✓</p>

            <h3 className="text-white text-[11px] font-black mt-2">
              COMPATIBILIDAD
            </h3>

            <p className="text-gray-500 text-[9px] mt-2">
              Encontrá piezas compatibles con tu vehículo.
            </p>
          </div>

          <div>
            <p className="text-orange-500 text-xl">✓</p>

            <h3 className="text-white text-[11px] font-black mt-2">
              ENVÍOS A TODO EL PAÍS
            </h3>

            <p className="text-gray-500 text-[9px] mt-2">
              Recibí tus repuestos donde estés.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}