import { useEffect, useMemo, useState } from "react";
import { listarMarcas } from "./api";

const ANIO_ACTUAL = new Date().getFullYear();
const ANIOS = Array.from(
  { length: ANIO_ACTUAL - 1989 },
  (_, i) => ANIO_ACTUAL - i
);

/**
 * SelectorVehiculo
 * ==========================================
 * Cascada Marca -> Modelo -> Año para elegir el vehículo.
 *
 */
export default function SelectorVehiculo({ onBuscar, onLimpiar }) {
  const [marcas, setMarcas] = useState([]);
  const [cargandoMarcas, setCargandoMarcas] = useState(true);

  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anio, setAnio] = useState("");

  useEffect(() => {
    listarMarcas()
      .then(setMarcas)
      .catch(() => setMarcas([]))
      .finally(() => setCargandoMarcas(false));
  }, []);

  const modelosDisponibles = useMemo(
    () => marcas.find((m) => m.brand === marca)?.models || [],
    [marcas, marca]
  );

  // Subtask 1: validación de la cascada mínima obligatoria.
  const faltanDatos = !marca || !modelo || !anio;

  const manejarCambioMarca = (nuevaMarca) => {
    setMarca(nuevaMarca);
    setModelo(""); // la cascada reinicia el modelo al cambiar de marca
    setAnio("");
  };

  const manejarCambioModelo = (nuevoModelo) => {
    setModelo(nuevoModelo);
    setAnio("");
  };

  const manejarBuscar = () => {
    if (faltanDatos) return;
    onBuscar({ marca, modelo, anio: Number(anio) });
  };

  const manejarLimpiar = () => {
    setMarca("");
    setModelo("");
    setAnio("");
    onLimpiar?.();
  };

  return (
    <div className="flex flex-col gap-3 bg-[#151719] text-white rounded-lg px-5 py-4 min-w-[430px]">
      <p className="text-[9px] text-gray-400 uppercase font-bold">
        Buscar por vehículo
      </p>

      <div className="flex flex-col sm:flex-row gap-2">
        <select
          value={marca}
          onChange={(e) => manejarCambioMarca(e.target.value)}
          disabled={cargandoMarcas}
          className="flex-1 bg-white text-gray-900 border border-gray-200 rounded-md px-3 py-2 text-[10px] outline-none"
        >
          <option value="">
            {cargandoMarcas ? "Cargando marcas..." : "Marca"}
          </option>
          {marcas.map((m) => (
            <option key={m.brand} value={m.brand}>
              {m.brand}
            </option>
          ))}
        </select>

        <select
          value={modelo}
          onChange={(e) => manejarCambioModelo(e.target.value)}
          disabled={!marca}
          className="flex-1 bg-white text-gray-900 border border-gray-200 rounded-md px-3 py-2 text-[10px] outline-none disabled:bg-gray-100 disabled:text-gray-400"
        >
          <option value="">Modelo</option>
          {modelosDisponibles.map((mod) => (
            <option key={mod} value={mod}>
              {mod}
            </option>
          ))}
        </select>

        <select
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          disabled={!modelo}
          className="flex-1 bg-white text-gray-900 border border-gray-200 rounded-md px-3 py-2 text-[10px] outline-none disabled:bg-gray-100 disabled:text-gray-400"
        >
          <option value="">Año</option>
          {ANIOS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={manejarBuscar}
          disabled={faltanDatos}
          className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed text-white rounded-md py-2 text-[10px] font-black transition"
        >
          Buscar Repuestos
        </button>

        <button
          type="button"
          onClick={manejarLimpiar}
          className="text-orange-500 text-[9px] font-bold underline whitespace-nowrap"
        >
          Borrar Filtros
        </button>
      </div>
    </div>
  );
}
