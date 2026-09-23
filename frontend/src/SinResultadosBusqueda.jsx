/**
 * SinResultadosBusqueda
 * ==========================================
 * Componente de retroalimentación que se muestra cuando una búsqueda
 * de repuestos no devuelve ningún resultado (arreglo vacío).
 *
 * Props:
 *  - termino (string): el texto que ingresó el cliente en el buscador.
 */
export default function SinResultadosBusqueda({ termino }) {
  return (
    <div
      role="status"
      className="py-20 text-center text-gray-400 text-sm"
    >
      No encontramos repuestos coincidentes con la búsqueda '
      <span className="font-bold text-gray-500">{termino}</span>'
    </div>
  );
}
