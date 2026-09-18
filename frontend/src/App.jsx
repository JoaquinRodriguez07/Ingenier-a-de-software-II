import { useEffect, useState } from "react";

import Home from "./Home";
import Login from "./Login";
import Registro from "./Registro";
import Perfil from "./Perfil";
import Direcciones from "./Direcciones";
import MetodosPago from "./MetodosPago";
import HistorialCompras from "./HistorialCompras";
import Catalogo from "./Catalogo";
import DetalleProducto from "./DetalleProducto";
import Marcas from "./Marcas";
import Carrito from "./Carrito";
import Favoritos from "./Favoritos";

function App() {
  const [pagina, setPagina] = useState("home");

  const [categoriaCatalogo, setCategoriaCatalogo] =
    useState("Frenos");

  const [productoSeleccionado, setProductoSeleccionado] =
    useState(null);

  /* =====================================================
     SESIÓN
  ====================================================== */

  const [usuario, setUsuario] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem("autobought-sesion")
        ) || null
      );
    } catch {
      return null;
    }
  });

  /* =====================================================
     CARRITO
  ====================================================== */

  const [carrito, setCarrito] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem("autobought-carrito")
        ) || []
      );
    } catch {
      return [];
    }
  });

  /* =====================================================
     FAVORITOS
  ====================================================== */

  const [favoritos, setFavoritos] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem("autobought-favoritos")
        ) || []
      );
    } catch {
      return [];
    }
  });

  /* =====================================================
     DIRECCIONES
  ====================================================== */

  const [direcciones, setDirecciones] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem(
            "autobought-direcciones"
          )
        ) || []
      );
    } catch {
      return [];
    }
  });

  /* =====================================================
     MÉTODOS DE PAGO
  ====================================================== */

  const [metodosPago, setMetodosPago] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem(
            "autobought-metodos-pago"
          )
        ) || []
      );
    } catch {
      return [];
    }
  });

  /* =====================================================
     HISTORIAL DE COMPRAS
  ====================================================== */

  const [historialCompras, setHistorialCompras] =
    useState(() => {
      try {
        return (
          JSON.parse(
            localStorage.getItem(
              "autobought-historial-compras"
            )
          ) || []
        );
      } catch {
        return [];
      }
    });

  /* =====================================================
     GUARDAR CARRITO
  ====================================================== */

  useEffect(() => {
    localStorage.setItem(
      "autobought-carrito",
      JSON.stringify(carrito)
    );
  }, [carrito]);

  /* =====================================================
     GUARDAR FAVORITOS
  ====================================================== */

  useEffect(() => {
    localStorage.setItem(
      "autobought-favoritos",
      JSON.stringify(favoritos)
    );
  }, [favoritos]);

  /* =====================================================
     GUARDAR DIRECCIONES
  ====================================================== */

  useEffect(() => {
    localStorage.setItem(
      "autobought-direcciones",
      JSON.stringify(direcciones)
    );
  }, [direcciones]);

  /* =====================================================
     GUARDAR MÉTODOS DE PAGO
  ====================================================== */

  useEffect(() => {
    localStorage.setItem(
      "autobought-metodos-pago",
      JSON.stringify(metodosPago)
    );
  }, [metodosPago]);

  /* =====================================================
     GUARDAR HISTORIAL
  ====================================================== */

  useEffect(() => {
    localStorage.setItem(
      "autobought-historial-compras",
      JSON.stringify(historialCompras)
    );
  }, [historialCompras]);

  /* =====================================================
     NAVEGACIÓN
  ====================================================== */

  const irAlCatalogo = (categoria = "Frenos") => {
    setCategoriaCatalogo(categoria);
    setPagina("catalogo");
  };

  const irAlDetalle = (producto) => {
    setProductoSeleccionado(producto);
    setPagina("detalle");
  };

  const irAlCarrito = () => {
    setPagina("carrito");
  };

  const irAFavoritos = () => {
    if (!usuario) {
      setPagina("login");
      return;
    }

    setPagina("favoritos");
  };

  /* =====================================================
     LOGIN
  ====================================================== */

  const iniciarSesion = (
    usuarioLogueado,
    recordar
  ) => {
    setUsuario(usuarioLogueado);

    if (recordar) {
      localStorage.setItem(
        "autobought-sesion",
        JSON.stringify(usuarioLogueado)
      );
    }

    setPagina("home");
  };

  /* =====================================================
     REGISTRO
  ====================================================== */

  const registroExitoso = (usuarioNuevo) => {
    setUsuario(usuarioNuevo);

    localStorage.setItem(
      "autobought-sesion",
      JSON.stringify(usuarioNuevo)
    );

    setPagina("home");
  };

  /* =====================================================
     ACTUALIZAR USUARIO
  ====================================================== */

  const actualizarUsuario = (usuarioActualizado) => {
    setUsuario(usuarioActualizado);

    localStorage.setItem(
      "autobought-sesion",
      JSON.stringify(usuarioActualizado)
    );
  };

  /* =====================================================
     CERRAR SESIÓN
  ====================================================== */

  const cerrarSesion = () => {
    setUsuario(null);

    localStorage.removeItem(
      "autobought-sesion"
    );

    setPagina("home");
  };

  /* =====================================================
     CARRITO
  ====================================================== */

  const agregarAlCarrito = (
    producto,
    cantidad = 1
  ) => {
    if (!usuario) {
      setPagina("login");
      return;
    }

    const cantidadFinal = Math.max(
      1,
      Number(cantidad) || 1
    );

    setCarrito((actual) => {
      const existente = actual.find(
        (item) => item.id === producto.id
      );

      if (existente) {
        return actual.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad:
                  item.cantidad +
                  cantidadFinal,
              }
            : item
        );
      }

      return [
        ...actual,
        {
          ...producto,
          cantidad: cantidadFinal,
        },
      ];
    });
  };

  const cambiarCantidad = (
    id,
    cambio
  ) => {
    setCarrito((actual) =>
      actual.map((item) =>
        item.id === id
          ? {
              ...item,
              cantidad: Math.max(
                1,
                item.cantidad + cambio
              ),
            }
          : item
      )
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((actual) =>
      actual.filter(
        (item) => item.id !== id
      )
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  /* =====================================================
     FAVORITOS
  ====================================================== */

  const alternarFavorito = (producto) => {
    if (!usuario) {
      setPagina("login");
      return;
    }

    setFavoritos((actual) => {
      const existe = actual.some(
        (item) => item.id === producto.id
      );

      return existe
        ? actual.filter(
            (item) => item.id !== producto.id
          )
        : [...actual, producto];
    });
  };

  const esFavorito = (id) =>
    favoritos.some(
      (item) => item.id === id
    );

  /* =====================================================
     CONTADORES
  ====================================================== */

  const cantidadCarrito =
    carrito.reduce(
      (total, item) =>
        total + item.cantidad,
      0
    );

  /* =====================================================
     PROPS NAVBAR
  ====================================================== */

  const propsNavbar = {
  usuario,

  onHome: () => setPagina("home"),

  onCatalogo: irAlCatalogo,

  onLogin: () => {
    if (usuario) {
      setPagina("perfil");
    } else {
      setPagina("login");
    }
  },

  onMarcas: () => setPagina("marcas"),

  onCarrito: irAlCarrito,

  onFavoritos: irAFavoritos,

  // ==========================================
  // ACCESOS DEL MENÚ DE USUARIO
  // ==========================================

  onPerfil: () => {
    setPagina("perfil");
  },

  onDirecciones: () => {
    setPagina("direcciones");
  },

  onMetodosPago: () => {
    setPagina("metodosPago");
  },

  onHistorial: () => {
    setPagina("historialCompras");
  },

  onCerrarSesion: cerrarSesion,

  // ==========================================
  // CONTADORES
  // ==========================================

  cantidadCarrito,

  cantidadFavoritos: favoritos.length,
};

  /* =====================================================
     RENDER
  ====================================================== */

  return (
    <>
      {/* =================================================
          HOME
      ================================================== */}

      {pagina === "home" && (
        <Home {...propsNavbar} />
      )}

      {/* =================================================
          MARCAS
      ================================================== */}

      {pagina === "marcas" && (
        <Marcas {...propsNavbar} />
      )}

      {/* =================================================
          CATÁLOGO
      ================================================== */}

      {pagina === "catalogo" && (
        <Catalogo
          {...propsNavbar}
          onDetalle={irAlDetalle}
          categoriaInicial={
            categoriaCatalogo
          }
          carrito={carrito}
          favoritos={favoritos}
          onAgregarAlCarrito={
            agregarAlCarrito
          }
          onAlternarFavorito={
            alternarFavorito
          }
          esFavorito={esFavorito}
        />
      )}

      {/* =================================================
          DETALLE
      ================================================== */}

      {pagina === "detalle" && (
        <DetalleProducto
          {...propsNavbar}
          onDetalle={irAlDetalle}
          onCatalogo={irAlCatalogo}
          producto={
            productoSeleccionado
          }
          onAgregarAlCarrito={
            agregarAlCarrito
          }
          onAlternarFavorito={
            alternarFavorito
          }
          esFavorito={esFavorito}
        />
      )}

      {/* =================================================
          FAVORITOS
      ================================================== */}

      {pagina === "favoritos" &&
        usuario && (
          <Favoritos
            {...propsNavbar}
            favoritos={favoritos}
            onAlternarFavorito={
              alternarFavorito
            }
            onAgregarAlCarrito={
              agregarAlCarrito
            }
            onDetalle={irAlDetalle}
          />
        )}

      {/* =================================================
          LOGIN
      ================================================== */}

      {pagina === "login" && (
        <Login
          {...propsNavbar}
          onIniciarSesion={
            iniciarSesion
          }
          onRegistro={() =>
            setPagina("registro")
          }
        />
      )}

      {/* =================================================
          REGISTRO
      ================================================== */}

      {pagina === "registro" && (
        <Registro
          {...propsNavbar}
          onRegistroExitoso={
            registroExitoso
          }
        />
      )}

      {/* =================================================
          PERFIL
      ================================================== */}

      {pagina === "perfil" &&
        usuario && (
          <Perfil
            {...propsNavbar}
            usuario={usuario}
            onCerrarSesion={
              cerrarSesion
            }
            onActualizarUsuario={
              actualizarUsuario
            }
            onDirecciones={() =>
              setPagina("direcciones")
            }
            onMetodosPago={() =>
              setPagina("metodosPago")
            }
            onHistorialCompras={() =>
              setPagina(
                "historialCompras"
              )
            }
          />
        )}

      {/* =================================================
          DIRECCIONES
      ================================================== */}

      {pagina === "direcciones" &&
        usuario && (
          <Direcciones
            {...propsNavbar}
            direcciones={direcciones}
            setDirecciones={
              setDirecciones
            }
            onPerfil={() =>
              setPagina("perfil")
            }
          />
        )}

      {/* =================================================
          MÉTODOS DE PAGO
      ================================================== */}

      {pagina === "metodosPago" &&
        usuario && (
          <MetodosPago
            {...propsNavbar}
            metodosPago={metodosPago}
            setMetodosPago={
              setMetodosPago
            }
            onPerfil={() =>
              setPagina("perfil")
            }
          />
        )}

      {/* =================================================
          HISTORIAL DE COMPRAS
      ================================================== */}

      {pagina === "historialCompras" &&
        usuario && (
          <HistorialCompras
            {...propsNavbar}
            historialCompras={
              historialCompras
            }
            onPerfil={() =>
              setPagina("perfil")
            }
          />
        )}

      {/* =================================================
          CARRITO
      ================================================== */}

      {pagina === "carrito" && (
        <Carrito
          {...propsNavbar}
          productos={carrito}
          onCambiarCantidad={
            cambiarCantidad
          }
          onEliminarProducto={
            eliminarDelCarrito
          }
          onVaciarCarrito={
            vaciarCarrito
          }
          onDetalle={irAlDetalle}
        />
      )}
    </>
  );
}

export default App;