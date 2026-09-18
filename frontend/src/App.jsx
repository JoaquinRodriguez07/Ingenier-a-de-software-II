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

  const [favoritos, setFavoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("autobought-favoritos")) || [];
    } catch {
      return [];
    }
  });

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

  const alternarFavorito = (producto) => {
    setFavoritos((actual) => {
      const existe = actual.some((item) => item.id === producto.id);
      return existe
        ? actual.filter((item) => item.id !== producto.id)
        : [...actual, producto];
    });
  };

  const esFavorito = (id) => favoritos.some((item) => item.id === id);

  const propsNavbar = {
    onHome: () => setPagina("home"),
    onCatalogo: irAlCatalogo,
    onLogin: () => setPagina("login"),
    onMarcas: () => setPagina("marcas"),
    onCarrito: irAlCarrito,
    onFavoritos: irAFavoritos,
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
          favoritos={favoritos}
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
          onAlternarFavorito={alternarFavorito}
          esFavorito={esFavorito}
        />
      )}

      {pagina === "favoritos" && (
        <Favoritos
          {...propsNavbar}
          favoritos={favoritos}
          onAlternarFavorito={alternarFavorito}
          onDetalle={irAlDetalle}
        />
      )}

      {pagina === "login" && <Login {...propsNavbar} />}

      {pagina === "carrito" && (
        <Carrito {...propsNavbar} onDetalle={irAlDetalle} />
      )}
    </>
  );
}

export default App;
