const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

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
