const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

/**
 * buscarRepuestos
 *
 * @param {object} filtros
 * @param {string} [filtros.search]   - texto del buscador
 * @param {string} [filtros.category] - categoría del sidebar (HU 1.2)
 * @param {string} [filtros.brand]    - marca del vehículo activo (HU 2.5)
 * @param {string} [filtros.model]    - modelo del vehículo activo
 * @param {number} [filtros.year]     - año del vehículo activo
 */
export async function buscarRepuestos({
  search,
  category,
  brand,
  model,
  year,
} = {}) {
  const params = new URLSearchParams();

  if (search?.trim()) params.set("search", search.trim());
  if (category?.trim()) params.set("category", category.trim());
  if (brand?.trim()) params.set("brand", brand.trim());
  if (model?.trim()) params.set("model", model.trim());
  if (year) params.set("year", String(year));

  const query = params.toString();
  const url = `${API_BASE_URL}/api/v1/parts${query ? `?${query}` : ""}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error("No se pudo obtener el listado de repuestos.");
  }

  return data.parts;
}


export async function listarMarcas() {
  const response = await fetch(`${API_BASE_URL}/api/v1/brands`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error("No se pudo obtener el listado de marcas.");
  }

  return data.brands; // [{ brand: "Chevrolet", models: ["Onix", "Prisma"] }, ...]
}

export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    const mensaje =
      typeof data.detail === "string"
        ? data.detail
        : "Correo electrónico o contraseña incorrectos.";
    throw new Error(mensaje);
  }

  return data;
}
