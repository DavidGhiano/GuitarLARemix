import { useLoaderData, useOutletContext } from "@remix-run/react";
import { useState } from "react";
import { getGuitarra } from "~/models/guitarras.server";

export async function loader({ params }) {
  const { guitarraUrl } = params;
  const guitarra = await getGuitarra(guitarraUrl);
  if (guitarra.meta.pagination.total === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Guitarra no encontrada",
    });
  }
  return guitarra.data;
}
export function meta({ data }) {
  if (!data) {
    return [
      { title: "GuitarLA - Guitarra no encontrada" },
      { description: "Guitarra, venta de guitarras, guitarra no encontrada" },
    ];
  }
  return [
    { title: `GuitarLA - ${data[0].attributes.nombre}` },
    {
      description: `Guitarras, venta de guitarras, guitarra ${data[0].attributes.nombre}`,
    },
  ];
}

const Guitarra = () => {
  const { agregarCarrito } = useOutletContext();
  const [cantidad, setCantidad] = useState(0);

  const guitarra = useLoaderData();
  const { nombre, descripcion, imagen, precio } = guitarra[0].attributes;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cantidad < 1) {
      alert("Debe seleccionar una cantidad");
      return;
    }
    const guitarraSeleccionada = {
      id: guitarra[0].id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad,
    };
    agregarCarrito(guitarraSeleccionada);
  };

  return (
    <>
        <div className="media-guitarra">
          <style jsx="true">{`
            .contenedor {
              position: relative;
            }
            .media-guitarra {
              background-image: url(${imagen.data.attributes.url});
              background-size: cover;
              position: absolute;
              margin-left: auto;
              margin-right: auto;
              top: -49.5rem;
              left: 0;
              right: 0;
              text-align: center;
              width: 30rem;
              height: 100vh;
              transform: rotate(-90deg);
              z-index:-1;
              opacity: 0.6;
            }
          `}</style>
        </div>
      <div className="guitarra">
        <img
          src={imagen.data.attributes.url}
          alt={`Imagen de la guitarra ${nombre}`}
          className="imagen"
        />
        <div className="contenido">
          <h3>{nombre}</h3>
          <p className="texto">{descripcion}</p>
          <p className="precio">${precio}</p>
          <form className="formulario" onSubmit={handleSubmit}>
            <label htmlFor="cantidad">Cantidad</label>
            <select
              id="cantidad"
              onChange={(e) => setCantidad(parseInt(e.target.value))}
            >
              <option value="0">-- Seleccione --</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <input type="submit" value="Agregar al carrito" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Guitarra;
