import { useVehicle } from "./VehicleContext";


export default function ActiveVehicleBanner({ onCambiar }) {
  const { vehiculoActivo, limpiarVehiculo } = useVehicle();

  if (!vehiculoActivo) return null;

  const { marca, modelo, anio } = vehiculoActivo;

  const manejarCambiar = () => {
    limpiarVehiculo();
    onCambiar?.();
  };

  return (
    <div className="bg-[#151719] text-white rounded-lg px-5 py-4 min-w-[430px]">
      <p className="text-[9px] text-gray-400">Mostrando repuestos para:</p>

      <div className="flex items-center gap-3 mt-1">
        <span className="text-xl">🚗</span>

        <p className="text-[14px] font-black">
          {marca} {modelo} {anio}
        </p>

        <button
          type="button"
          onClick={manejarCambiar}
          className="text-orange-500 text-[9px] font-bold underline"
        >
          Cambiar
        </button>
      </div>
    </div>
  );
}
