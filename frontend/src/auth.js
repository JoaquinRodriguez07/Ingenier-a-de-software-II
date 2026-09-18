export function haySesionActiva() {
    return Boolean(
      localStorage.getItem("autobought-sesion") ||
      sessionStorage.getItem("autobought-sesion")
    );
  }