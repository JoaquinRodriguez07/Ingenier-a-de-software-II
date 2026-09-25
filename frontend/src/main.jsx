import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { VehicleProvider } from './VehicleContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* VehicleProvider va por fuera de las rutas: así el vehículo
          activo (HU 2.3) sobrevive a la navegación entre pantallas
          (ej: Catálogo -> Carrito -> Catálogo). */}
      <VehicleProvider>
        <App />
      </VehicleProvider>
    </BrowserRouter>
  </StrictMode>,
)