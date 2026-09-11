import Navbar from "./Navbar";

import AudiLogo from "./assets/Logos Vehiculos/Audi.svg";
import BMWLogo from "./assets/Logos Vehiculos/BMW.png";
import BYDLogo from "./assets/Logos Vehiculos/Byd.png";
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

export default function Marcas({
  onHome,
  onCatalogo,
  onLogin,
  onMarcas,
  onCarrito,
  onFavoritos,
  cantidadCarrito,
  cantidadFavoritos,
}) {
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
      nombre: "Citroën",
      logo: CitroenLogo,
    },
    {
      nombre: "Nissan",
      logo: "https://cdn.simpleicons.org/nissan/000000",
    },
    {
      nombre: "Hyundai",
      logo: HyundaiLogo,
    },
    {
      nombre: "Kia",
      logo: "https://cdn.simpleicons.org/kia/000000",
    },
    {
      nombre: "Suzuki",
      logo: SuzukiLogo,
    },
    {
      nombre: "Honda",
      logo: "https://cdn.simpleicons.org/honda/000000",
    },
    {
      nombre: "BMW",
      logo: BMWLogo,
    },
    {
      nombre: "Mercedes-Benz",
      logo: MercedesLogo,
    },
    {
      nombre: "Audi",
      logo: AudiLogo,
    },
    {
      nombre: "Jeep",
      logo: "https://cdn.simpleicons.org/jeep/000000",
    },
    {
      nombre: "Mitsubishi",
      logo: "https://cdn.simpleicons.org/mitsubishi/000000",
    },
    {
      nombre: "Chery",
      logo: CheryLogo,
    },
    {
      nombre: "BYD",
      logo: BYDLogo,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-gray-900 font-sans">

      {/* NAVBAR */}

      <Navbar
        paginaActual="marcas"
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
          CONTENIDO
      ====================================================== */}

      <main className="pt-[105px]">

        {/* ENCABEZADO */}

        <section className="bg-white px-6 py-14">

          <div className="max-w-[1100px] mx-auto">

            <p className="text-orange-500 text-[10px] font-black tracking-[4px]">
              ENCONTRÁ TU VEHÍCULO
            </p>

            <h1 className="text-4xl md:text-5xl font-black italic uppercase mt-2">
              MARCAS
            </h1>

            <p className="text-gray-500 text-sm max-w-[600px] mt-4 leading-relaxed">
              Seleccioná la marca de tu vehículo para encontrar
              los repuestos compatibles disponibles en AutoBought.
            </p>

          </div>

        </section>

        {/* =====================================================
            MARCAS
        ====================================================== */}

        <section className="max-w-[1100px] mx-auto px-6 py-12">

          <div className="flex items-center justify-between mb-7">

            <div>

              <h2 className="text-xl font-black uppercase">
                Marcas disponibles
              </h2>

              <p className="text-[10px] text-gray-400 mt-1">
                Trabajamos con las principales marcas de vehículos.
              </p>

            </div>

            <span className="text-[10px] text-gray-400">
              {marcas.length} marcas
            </span>

          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

            {marcas.map((marca) => (

              <button
                key={marca.nombre}
                type="button"
                onClick={() => onCatalogo("Frenos")}
                className="group bg-white border border-gray-100 rounded-xl h-[145px] flex flex-col items-center justify-center shadow-sm hover:shadow-lg hover:border-orange-300 hover:-translate-y-1 transition duration-300"
              >

                <div className="h-16 w-28 flex items-center justify-center">

                  <img
                    src={marca.logo}
                    alt={`Logo ${marca.nombre}`}
                    className="max-h-14 max-w-24 object-contain grayscale group-hover:grayscale-0 transition duration-300"
                  />

                </div>

                <p className="text-[11px] font-bold mt-5 group-hover:text-orange-500 transition">
                  {marca.nombre}
                </p>

                <p className="text-[8px] text-gray-400 mt-1">
                  Ver repuestos →
                </p>

              </button>

            ))}

          </div>

        </section>

        {/* BANNER */}

        <section className="max-w-[1100px] mx-auto px-6 pb-14">

          <div className="bg-[#171b20] rounded-2xl px-7 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-5">

            <div>

              <p className="text-orange-500 text-[9px] font-black tracking-[3px]">
                ¿NO ENCONTRÁS TU MARCA?
              </p>

              <h2 className="text-white text-xl md:text-2xl font-black italic uppercase mt-2">
                BUSCÁ DIRECTAMENTE TU REPUESTO
              </h2>

              <p className="text-gray-400 text-[10px] mt-2">
                Nuestro catálogo se actualiza constantemente.
              </p>

            </div>

            <button
              type="button"
              onClick={() => onCatalogo("Frenos")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-lg text-[10px] font-black transition whitespace-nowrap"
            >
              VER REPUESTOS →
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}