import { createContext, useCallback, useContext, useState } from "react";


const VehicleContext = createContext(null);

export function VehicleProvider({ children }) {
  // null = no hay vehículo activo (catálogo completo / recién entra).
  // { marca, modelo, anio } = vehículo confirmado.
  const [vehiculoActivo, setVehiculoActivo] = useState(null);

  const confirmarVehiculo = useCallback((marca, modelo, anio) => {
    setVehiculoActivo({ marca, modelo, anio });
  }, []);

  const limpiarVehiculo = useCallback(() => {
    setVehiculoActivo(null);
  }, []);

  return (
    <VehicleContext.Provider
      value={{ vehiculoActivo, confirmarVehiculo, limpiarVehiculo }}
    >
      {children}
    </VehicleContext.Provider>
  );
}

export function useVehicle() {
  const contexto = useContext(VehicleContext);

  if (!contexto) {
    throw new Error(
      "useVehicle debe usarse dentro de un <VehicleProvider>. " +
        "Revisá que main.jsx envuelva <App /> con <VehicleProvider>."
    );
  }

  return contexto;
}
