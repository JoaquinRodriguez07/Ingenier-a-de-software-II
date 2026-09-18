import { useEffect, useState } from "react";

import Home from "./Home";
import Login from "./Login";
import Catalogo from "./Catalogo";
import DetalleProducto from "./DetalleProducto";
import Marcas from "./Marcas";
import Carrito from "./Carrito";
import Favoritos from "./Favoritos";

function App() {
  const [pagina, setPagina] = useState("home");
  const [categoriaCatalogo, setCategoriaCatalogo] = useState("Frenos");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const [carrito, setCarrito] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("autobought-carrito")) || [];
    } catch {
      return [];
    }
  });

  const [favoritos, setFavoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("autobought-favoritos")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("autobought-carrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    localStorage.setItem("autobought-favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const irAlCatalogo = (categoria = "Frenos") => {
    setCategoriaCatalogo(categoria);
    setPagina("catalogo");
  };

  const irAlDetalle = (producto) => {
    setProductoSeleccionado(producto);
    setPagina("detalle");
  };

  const irAlCarrito = () => setPagina("carrito");
  const irAFavoritos = () => setPagina("favoritos");

  const agregarAlCarrito = (producto, cantidad = 1) => {
    const cantidadFinal = Math.max(1, Number(cantidad) || 1);

    setCarrito((actual) => {
      const existente = actual.find((item) => item.id === producto.id);

      if (existente) {
        return actual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidadFinal }
            : item
        );
      }

      return [...actual, { ...producto, cantidad: cantidadFinal }];
    });
  };

  const cambiarCantidad = (id, cambio) => {
    setCarrito((actual) =>
      actual
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: Math.max(1, item.cantidad + cambio) }
            : item
        )
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((actual) => actual.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  const alternarFavorito = (producto) => {
    setFavoritos((actual) => {
      const existe = actual.some((item) => item.id === producto.id);
      return existe
        ? actual.filter((item) => item.id !== producto.id)
        : [...actual, producto];
    });
  };

  const esFavorito = (id) => favoritos.some((item) => item.id === id);

  const cantidadCarrito = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const propsNavbar = {
    onHome: () => setPagina("home"),
    onCatalogo: irAlCatalogo,
    onLogin: () => setPagina("login"),
    onMarcas: () => setPagina("marcas"),
    onCarrito: irAlCarrito,
    onFavoritos: irAFavoritos,
    cantidadCarrito,
    cantidadFavoritos: favoritos.length,
  };

  return (
    <>
      {pagina === "home" && <Home {...propsNavbar} />}

      {pagina === "marcas" && <Marcas {...propsNavbar} />}

      {pagina === "catalogo" && (
        <Catalogo
          {...propsNavbar}
          onDetalle={irAlDetalle}
          categoriaInicial={categoriaCatalogo}
          carrito={carrito}
          favoritos={favoritos}
          onAgregarAlCarrito={agregarAlCarrito}
          onAlternarFavorito={alternarFavorito}
          esFavorito={esFavorito}
        />
      )}

      {pagina === "detalle" && (
        <DetalleProducto
          {...propsNavbar}
          onDetalle={irAlDetalle}
          onCatalogo={irAlCatalogo}
          producto={productoSeleccionado}
          onAgregarAlCarrito={agregarAlCarrito}
          onAlternarFavorito={alternarFavorito}
          esFavorito={esFavorito}
        />
      )}

      {pagina === "favoritos" && (
        <Favoritos
          {...propsNavbar}
          favoritos={favoritos}
          onAlternarFavorito={alternarFavorito}
          onAgregarAlCarrito={agregarAlCarrito}
          onDetalle={irAlDetalle}
        />
      )}

      {pagina === "login" && <Login {...propsNavbar} />}

      {pagina === "carrito" && (
        <Carrito
          {...propsNavbar}
          productos={carrito}
          onCambiarCantidad={cambiarCantidad}
          onEliminarProducto={eliminarDelCarrito}
          onVaciarCarrito={vaciarCarrito}
          onDetalle={irAlDetalle}
        />
      )}
    </>
  );
}

export default App;
