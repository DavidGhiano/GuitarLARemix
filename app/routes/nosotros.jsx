import imagen from "../../public/img/nosotros.jpg";
import styles from "~/styles/nosotros.css";
export function links(){
  return [
    {
      rel: 'stylesheet',
      href: styles
    },
    {
      rel: 'preload',
      href: imagen,
      as: 'image'
    }
  ]
}

export function meta() {
  return [
     { title: "GuitarLA - Sobre Nosotros" },
     { description: 'Venta de guitarras, blog de música'}
  ];
}

const Nosotros = () => {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>
      <div className="contenido">
        <img src={imagen} alt="imagen sobre nosotros" />
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget
            volutpat nisi. Donec hendrerit, nisl condimentum cursus tristique,
            nisi turpis accumsan mi, vulputate mollis mi erat eu magna.
            Curabitur faucibus eget ante nec auctor. Ut varius eleifend odio,
            nec molestie ligula gravida at. Mauris varius eros in est tempor, in
            lacinia felis scelerisque. Donec sed luctus ante. Vestibulum commodo
            sodales ipsum id malesuada. Nam viverra bibendum mauris, eget
            vehicula velit dignissim non.
          </p>
          <p>
            Vivamus iaculis sem ut libero elementum, sed consequat lorem
            vestibulum. Nam auctor fermentum massa vel condimentum. Ut purus
            felis, gravida sed urna in, facilisis gravida erat. Curabitur
            consequat facilisis libero. Donec sit amet efficitur nisl, finibus
            aliquam purus. Nullam vel enim in quam consectetur rutrum. Cras sed
            libero sem. Nullam non leo viverra, lacinia nisl a, mollis purus.
            Fusce non sollicitudin elit. Fusce eget erat purus. Praesent feugiat
            rutrum cursus. Maecenas tellus massa, finibus ultricies sem id,
            porttitor scelerisque lorem. Nullam ullamcorper odio dui, id
            suscipit nisi pretium vestibulum.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Nosotros;
