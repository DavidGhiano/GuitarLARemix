import {
  Meta,
  Links,
  Outlet,
  Scripts,
  LiveReload,
  isRouteErrorResponse,
  useRouteError,
  Link,
} from "@remix-run/react";
import styles from "~/styles/index.css";
import Header from "~/components/header";
import Footer from "~/components/footer";
import { useEffect, useState } from "react";

export function meta() {
  return [
    { charset: "utf8" },
    { title: "GuitarLA - Remix" },
    { viewport: "width=device-width, initial-scale=1" },
  ];
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&display=swap",
    },
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export default function App() {
  const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null;
  const [carrito, setCarrito] = useState(carritoLS);
  useEffect( () => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  },[carrito])


  const agregarCarrito = (guitarra) => {
    if (carrito.some((guitarraState) => guitarraState.id == guitarra.id)) {
      const carritoActualizado = carrito.map((g) => {
        if (g.id === guitarra.id) {
          g.cantidad = guitarra.cantidad;
        }
        return g;
      });
      setCarrito(carritoActualizado);
    } else {
      setCarrito([...carrito, guitarra]);
    }
  };

  const actualizarCantidad = guitarra => {
      const carritoActualizado = carrito.map( g => {
        if(g.id === guitarra.id){
          g.cantidad = guitarra.cantidad;
        }
        return g;
      })
      setCarrito(carritoActualizado);
  }

  const eliminarGuitarra = id => {
    const carritoActualizado = carrito.filter( g => g.id !== id)
    setCarrito(carritoActualizado);
  }

  return (
    <Document>
      <Outlet
        context={{
          agregarCarrito,
          carrito,
          actualizarCantidad,
          eliminarGuitarra
        }}
      />
    </Document>
  );
}

function Document({ children }) {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <p className="error">
          {error.status} {error.statusText}
        </p>
        <Link className="error-enlace" to="/">
          Tal vez quieras volver a la página principal
        </Link>
      </Document>
    );
  }
}
