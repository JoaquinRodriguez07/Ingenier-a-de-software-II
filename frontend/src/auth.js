const SESION_KEY = "autobought-sesion";

export function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    const json = new TextDecoder("utf-8").decode(bytes);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function obtenerSesion() {
  try {
    const raw =
      localStorage.getItem(SESION_KEY) ||
      sessionStorage.getItem(SESION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function sesionValida(sesion) {
  if (!sesion) return false;

  // Sesiones sin JWT (ej. flujo de registro local, todavía no
  // conectado al backend) se consideran válidas mientras existan.
  if (!sesion.token) return true;

  const payload = decodeToken(sesion.token);
  if (!payload?.exp) return false;

  return payload.exp * 1000 > Date.now();
}

export function haySesionActiva() {
  return sesionValida(obtenerSesion());
}
