/**
 * filtrarRepuestos
 * ==========================================
 * Lógica de búsqueda, filtrado por categoría y orden del catálogo,
 * separada A PROPÓSITO de de dónde vienen los datos.
 *
 * Hoy `productos` es el array local de `productos.js`. El día que se
 * conecte con el backend (`GET /api/v1/parts`), lo único que cambia es
 * CÓMO se arma ese array (import estático -> `useState` + `fetch`).
 * Esta función no importa `productos.js` ni sabe nada de su origen:
 * quien la llama le pasa el array que tenga en ese momento.
 *
 * Además, tolera los dos "shapes" posibles de un repuesto, para que
 * si el día de mañana se usa la respuesta de la API tal cual viene
 * (sin remapear los campos), esto siga funcionando sin tocar nada:
 *
 *   Mock actual (productos.js)   →  Backend (PartOut)
 *   ----------------------------------------------------
 *   nombre                       →  name
 *   codigo                       →  part_code
 *   categoria                    →  category
 *   precio                       →  price
 *   marca (string)                →  compatible_brands (string[])
 *
 * Si en algún momento se decide mapear la respuesta de la API al shape
 * del mock antes de pasarla al catálogo, también funciona igual: los
 * getters de abajo primero intentan el campo del mock y si no existe
 * caen al campo del backend.
 */

// Placeholder para cuando el producto no trae imagen (hoy: cualquier
// repuesto que venga de la API real, que todavía no expone ese campo).
const IMAGEN_PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>" +
      "<rect width='100%' height='100%' fill='#f3f4f6'/>" +
      "<text x='50%' y='50%' font-family='sans-serif' font-size='16' " +
      "fill='#9ca3af' text-anchor='middle' dominant-baseline='middle'>" +
      "Sin imagen</text></svg>"
  );

// Exportados para que Catalogo.jsx (y cualquier otro componente que
// renderice un repuesto) pueda leer estos campos sin importarle si el
// objeto vino del mock local o de la API real.
export const getNombre = (p) => p.nombre ?? p.name ?? "";
export const getCodigo = (p) => p.codigo ?? p.part_code ?? "";
export const getCategoria = (p) => p.categoria ?? p.category ?? "";
export const getPrecio = (p) => p.precio ?? p.price ?? 0;
export const getMarca = (p) =>
  p.marca ??
  (Array.isArray(p.compatible_brands) ? p.compatible_brands.join(", ") : "");
export const getImagen = (p) => p.imagen ?? IMAGEN_PLACEHOLDER;

/**
 * @param {Array<object>} productos - array de repuestos (mock o API).
 * @param {object} opciones
 * @param {string} [opciones.categoria] - categoría seleccionada en el sidebar.
 * @param {string} [opciones.busqueda]  - texto ingresado en el SearchBar.
 * @param {string} [opciones.orden]     - "Menor precio" | "Mayor precio" | otro.
 * @returns {Array<object>} nuevo array filtrado y ordenado (no muta el original).
 */
export function filtrarRepuestos(
  productos,
  { categoria, busqueda = "", orden } = {}
) {
  let lista = Array.isArray(productos) ? productos : [];

  const termino = busqueda.trim().toLowerCase();

  if (termino) {
    // Búsqueda por texto: coincide con nombre o código (igual que el
    // ILIKE del backend), y de yapa marca/categoría para mejor UX.
    // Coincidencia parcial: no hace falta el código completo.
    lista = lista.filter((p) =>
      `${getNombre(p)} ${getCodigo(p)} ${getMarca(p)} ${getCategoria(p)}`
        .toLowerCase()
        .includes(termino)
    );
  } else if (categoria) {
    lista = lista.filter((p) => getCategoria(p) === categoria);
  }

  const listaOrdenada = [...lista];

  if (orden === "Menor precio") {
    listaOrdenada.sort((a, b) => getPrecio(a) - getPrecio(b));
  }

  if (orden === "Mayor precio") {
    listaOrdenada.sort((a, b) => getPrecio(b) - getPrecio(a));
  }

  return listaOrdenada;
}
