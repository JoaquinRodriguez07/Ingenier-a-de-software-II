import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";
import Carrito from "./Carrito";
import Catalogo from "./Catalogo";
import DetalleProducto from "./DetalleProducto";
import Favoritos from "./Favoritos";
import Home from "./Home";
import Login from "./Login";
import Marcas from "./Marcas";
import Navbar from "./Navbar";

const navigationProps = () => ({
  onHome: jest.fn(),
  onCatalogo: jest.fn(),
  onLogin: jest.fn(),
  onMarcas: jest.fn(),
  onCarrito: jest.fn(),
  onFavoritos: jest.fn(),
  cantidadCarrito: 0,
  cantidadFavoritos: 0,
});

const product = {
  id: "TEST-001",
  marca: "BOSCH",
  nombre: "Pastillas de prueba",
  codigo: "TEST-001",
  precio: 1500,
  categoria: "Frenos",
  imagen: "test-image.jpg",
  descripcion: "Descripcion de prueba",
  stock: 5,
  especificaciones: [["Material", "Semi-metalico"]],
  aplicaciones: ["Volkswagen Gol"],
  garantia: "6 meses",
  opiniones: [{ nombre: "Ana", estrellas: 5, texto: "Excelente" }],
};

afterEach(() => {
  localStorage.clear();
});

describe("Navbar", () => {
  it("calls navigation handlers and displays the cart count", async () => {
    const user = userEvent.setup();
    const props = navigationProps();
    props.cantidadCarrito = 2;

    render(<Navbar paginaActual="home" {...props} />);

    await user.click(screen.getByRole("button", { name: "Home" }));
    await user.click(screen.getByRole("button", { name: "Marcas" }));
    await user.click(screen.getByRole("button", { name: "Repuestos" }));
    await user.click(screen.getByTitle("Iniciar sesión"));
    await user.click(screen.getByTitle("Favoritos"));
    await user.click(screen.getByTitle("Carrito"));

    expect(props.onHome).toHaveBeenCalled();
    expect(props.onMarcas).toHaveBeenCalled();
    expect(props.onCatalogo).toHaveBeenCalledWith("Frenos");
    expect(props.onLogin).toHaveBeenCalled();
    expect(props.onFavoritos).toHaveBeenCalled();
    expect(props.onCarrito).toHaveBeenCalled();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});

describe("Home", () => {
  it("renders the hero and opens the catalog from the search button", async () => {
    const user = userEvent.setup();
    const props = navigationProps();

    render(<Home {...props} />);

    expect(screen.getByRole("heading", { name: /repuestos que te/i })).toBeInTheDocument();
    await user.click(screen.getAllByRole("button", { name: /buscar repuestos/i })[0]);

    expect(props.onCatalogo).toHaveBeenCalledWith("Frenos");
  });
});

describe("Catalogo", () => {
  it("filters products and adds the selected quantity to the cart", async () => {
    const user = userEvent.setup();
    const props = navigationProps();
    props.onAgregarAlCarrito = jest.fn();
    props.onAlternarFavorito = jest.fn();
    props.onDetalle = jest.fn();
    props.esFavorito = jest.fn(() => false);

    render(<Catalogo {...props} categoriaInicial="Frenos" />);

    expect(screen.getByText("Pastillas de Freno Delanteras Bosch")).toBeInTheDocument();
    const search = screen.getByPlaceholderText(/buscar repuesto/i);
    await user.type(search, "Brembo");

    expect(screen.getByText("Discos de Freno Delanteros")).toBeInTheDocument();
    expect(screen.queryByText("Pastillas de Freno Delanteras Bosch")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: /agregar/i }));

    expect(props.onAgregarAlCarrito).toHaveBeenCalledWith(
      expect.objectContaining({ nombre: "Discos de Freno Delanteros" }),
      2
    );
  });

  it("changes category and toggles a product favorite", async () => {
    const user = userEvent.setup();
    const props = navigationProps();
    props.onAgregarAlCarrito = jest.fn();
    props.onAlternarFavorito = jest.fn();
    props.onDetalle = jest.fn();
    props.esFavorito = jest.fn(() => false);

    render(<Catalogo {...props} categoriaInicial="Frenos" />);

    await user.click(screen.getByRole("button", { name: /filtros/i }));
    expect(screen.getByText("Filtro de Aire")).toBeInTheDocument();
    const favoriteButtons = screen.getAllByRole("button", { name: "♡" });
    await user.click(favoriteButtons[favoriteButtons.length - 1]);

    expect(props.onAlternarFavorito).toHaveBeenCalledWith(
      expect.objectContaining({ nombre: "Filtro de Aire" })
    );
  });
});

describe("DetalleProducto", () => {
  it("changes quantity, adds the product, and switches detail tabs", async () => {
    const user = userEvent.setup();
    const props = navigationProps();
    props.onAgregarAlCarrito = jest.fn();
    props.onAlternarFavorito = jest.fn();
    props.esFavorito = jest.fn(() => false);

    render(<DetalleProducto {...props} producto={product} />);

    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: /agregar al carrito/i }));
    await user.click(screen.getByRole("button", { name: "Especificaciones" }));

    expect(props.onAgregarAlCarrito).toHaveBeenCalledWith(product, 2);
    expect(screen.getByText("Especificaciones técnicas")).toBeInTheDocument();
    expect(screen.getByText("Semi-metalico")).toBeInTheDocument();
  });
});

describe("Carrito", () => {
  it("renders an empty state and navigates to the catalog", async () => {
    const user = userEvent.setup();
    const props = navigationProps();

    render(<Carrito {...props} productos={[]} />);
    await user.click(screen.getByRole("button", { name: /ver repuestos/i }));

    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
    expect(props.onCatalogo).toHaveBeenCalledWith("Frenos");
  });

  it("shows totals and emits quantity, remove, and clear actions", async () => {
    const user = userEvent.setup();
    const props = navigationProps();
    props.onCambiarCantidad = jest.fn();
    props.onEliminarProducto = jest.fn();
    props.onVaciarCarrito = jest.fn();
    props.onDetalle = jest.fn();
    const cartProduct = { ...product, cantidad: 2 };

    render(<Carrito {...props} productos={[cartProduct]} cantidadCarrito={2} />);
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "−" }));
    await user.click(screen.getByRole("button", { name: "🗑" }));
    await user.click(screen.getByRole("button", { name: /vaciar carrito/i }));

    expect(screen.getAllByText("$3.000")[0]).toBeInTheDocument();
    expect(props.onCambiarCantidad).toHaveBeenCalledWith("TEST-001", 1);
    expect(props.onCambiarCantidad).toHaveBeenCalledWith("TEST-001", -1);
    expect(props.onEliminarProducto).toHaveBeenCalledWith("TEST-001");
    expect(props.onVaciarCarrito).toHaveBeenCalled();
  });
});

describe("Favoritos", () => {
  it("renders the empty state and opens the catalog", async () => {
    const user = userEvent.setup();
    const props = navigationProps();

    render(<Favoritos {...props} favoritos={[]} />);
    await user.click(screen.getByRole("button", { name: /explorar repuestos/i }));

    expect(screen.getByText("Todavía no tenés favoritos")).toBeInTheDocument();
    expect(props.onCatalogo).toHaveBeenCalledWith("Frenos");
  });

  it("renders favorites and supports remove, detail, and add actions", async () => {
    const user = userEvent.setup();
    const props = navigationProps();
    props.onAlternarFavorito = jest.fn();
    props.onAgregarAlCarrito = jest.fn();
    props.onDetalle = jest.fn();

    render(<Favoritos {...props} favoritos={[product]} />);
    const favoriteButtons = screen.getAllByRole("button", { name: "♥" });
    await user.click(favoriteButtons[favoriteButtons.length - 1]);
    await user.click(screen.getByRole("button", { name: product.nombre }));
    await user.click(screen.getByRole("button", { name: /agregar al carrito/i }));

    expect(props.onAlternarFavorito).toHaveBeenCalledWith(product);
    expect(props.onDetalle).toHaveBeenCalledWith(product);
    expect(props.onAgregarAlCarrito).toHaveBeenCalledWith(product, 1);
  });
});

describe("Login", () => {
  it("toggles password visibility and remembers the user selection", async () => {
    const user = userEvent.setup();
    render(<Login {...navigationProps()} />);

    const password = screen.getByPlaceholderText("••••••••");
    expect(password).toHaveAttribute("type", "password");
    await user.click(screen.getByRole("button", { name: "○" }));
    expect(password).toHaveAttribute("type", "text");

    const remember = screen.getByRole("checkbox");
    await user.click(remember);
    expect(remember).toBeChecked();
  });
});

describe("Marcas", () => {
  it("renders available brands and opens the catalog for a selected brand", async () => {
    const user = userEvent.setup();
    const props = navigationProps();

    render(<Marcas {...props} />);
    expect(screen.getByText("20 marcas")).toBeInTheDocument();
    expect(screen.getByText("Volkswagen")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Volkswagen/i }));
    expect(props.onCatalogo).toHaveBeenCalledWith("Frenos");
  });
});

describe("App", () => {
  it("starts on home and changes pages through the navbar", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole("heading", { name: /repuestos que te/i })).toBeInTheDocument();
    await user.click(screen.getByTitle("Iniciar sesión"));

    expect(screen.getByRole("heading", { name: "INICIAR SESIÓN" })).toBeInTheDocument();
  });

  it("persists a product added from the catalog in the cart", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Repuestos" }));
    await user.click(screen.getAllByRole("button", { name: /agregar/i })[0]);
    await user.click(screen.getByTitle("Carrito"));

    expect(screen.getByText("Tu Carrito de Compras")).toBeInTheDocument();
    expect(screen.getByText("Pastillas de Freno Delanteras Bosch")).toBeInTheDocument();
    expect(localStorage.getItem("autobought-carrito")).toContain("BP1234");
  });
});
