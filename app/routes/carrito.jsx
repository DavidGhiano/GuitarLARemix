import { useOutletContext } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ClientOnly } from "remix-utils/client-only";
import Style from "~/styles/carrito.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: Style,
    },
  ];
}

export function meta() {
  return [
    { title: "GuitarLA - Carrito de Compra" },
    {
      description:
        "Venta de guitarras, música, blog, carrito de compras, tienda",
    },
  ];
}

const Carrito = () => {
  const [total, setTotal] = useState();
  const { carrito, actualizarCantidad, eliminarGuitarra } = useOutletContext();

  useEffect(() => {
    const calculoTotal = carrito.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0
    );
    setTotal(calculoTotal);
  }, [carrito]);

  return (
    <ClientOnly fallback={<h1 className="heading">Cargando</h1>}>
    { () => (
        <main className="contenedor">
          <h1 className="heading">Carrito de Comrpas</h1>
          <div className="contenido">
            <div className="carrito">
              <h2>Articulos</h2>
              {carrito?.length === 0
                ? "Carrito Vacío"
                : carrito?.map((producto) => (
                    <div key={producto.id} className="producto">
                      <div>
                        <img
                          src={producto.imagen}
                          alt={`imagen del producto ${producto.nombre}`}
                        />
                      </div>
                      <div>
                        <p className="nombre">{producto.nombre}</p>
                        <p className="cantidad">Cantidad:</p>
                        <select
                          className="select"
                          value={producto.cantidad}
                          onChange={(e) =>
                            actualizarCantidad({
                              cantidad: +e.target.value,
                              id: producto.id,
                            })
                          }
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        <p className="precio">
                          $ <span>{producto.precio}</span>
                        </p>
                        <p className="subtotal">
                          Subtotal: $
                          <span>{producto.cantidad * producto.precio}</span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn-eliminar"
                        onClick={() => eliminarGuitarra(producto.id)}
                      >
                        X
                      </button>
                    </div>
                  ))}
            </div>
            <aside className="resumen">
              <h3>Resumen del Pedido</h3>
              <p>Total a pagar: ${total}</p>
            </aside>
          </div>
        </main>
    )}
    </ClientOnly>
  );
};

export default Carrito;
