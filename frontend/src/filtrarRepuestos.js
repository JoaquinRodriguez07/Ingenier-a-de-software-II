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

const getNombre = (p) => p.nombre ?? p.name ?? "";
const getCodigo = (p) => p.codigo ?? p.part_code ?? "";
const getCategoria = (p) => p.categoria ?? p.category ?? "";
const getPrecio = (p) => p.precio ?? p.price ?? 0;
const getMarca = (p) =>
  p.marca ??
  (Array.isArray(p.compatible_brands) ? p.compatible_brands.join(" ") : "");

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
