import React from 'react';

const Nosotros = () => {
  return (
    <div className="container">
      <div className="nosotros-container">
        <h2 className="nosotros-heading">El Restaurante</h2>
        <p className="nosotros-text">
          Bienvenido a nuestro restaurante. Somos un lugar acogedor y lleno de sabor, donde
          la pasión por la comida se une con un ambiente amigable. Nuestro equipo de chefs
          altamente capacitados se dedica a crear platos excepcionales utilizando ingredientes
          frescos y de alta calidad. Desde platos clásicos hasta creaciones culinarias únicas,
          nuestra variedad de opciones te sorprenderá.
        </p>
        <p className="nosotros-text">
          Además de nuestra excelente comida, ofrecemos una amplia selección de vinos finos y
          cócteles artesanales para complementar tu experiencia gastronómica. Nuestro personal
          amable y atento se asegurará de que te sientas bienvenido y atendido durante toda tu
          visita. Ya sea que estés buscando una cena romántica o una reunión familiar, nuestro
          restaurante es el lugar perfecto para disfrutar de momentos especiales.
        </p>
      </div>
      <div className="image-container">
        <img className="restaurant-image" src="img.jpg" alt="Restaurant" />
      </div>
      <div className="nosotros-container">
        <h2 className="nosotros-heading">Nuestro Equipo</h2>
        <p className="nosotros-text">
          En nuestro restaurante, contamos con un equipo apasionado y dedicado que trabaja en conjunto para brindar una experiencia excepcional a nuestros clientes. Desde los chefs hasta el personal de servicio, cada miembro desempeña un papel vital en la creación de un ambiente acogedor y en la entrega de platos deliciosos.

          Nuestros talentosos chefs son expertos en su oficio y están comprometidos en ofrecer platos de alta calidad que combinan técnicas culinarias innovadoras con ingredientes frescos y de temporada. Su creatividad y atención al detalle se reflejan en cada plato que sale de nuestra cocina.

          El equipo de servicio al cliente se asegura de que cada visita sea especial y memorable. Son amigables, atentos y están siempre dispuestos a brindar recomendaciones, responder preguntas y garantizar que los comensales se sientan bienvenidos y satisfechos durante su estadía en nuestro restaurante.
        </p>
        <p className="nosotros-text">
          Además, contamos con un equipo dedicado a la gestión y coordinación de operaciones, quienes trabajan detrás de escena para garantizar un funcionamiento eficiente y una experiencia sin contratiempos. Su enfoque en la organización y atención a los detalles asegura que todo esté en orden para que los clientes puedan disfrutar de una experiencia gastronómica sin preocupaciones.

          En conjunto, nuestro equipo es una parte integral de lo que hace que nuestro restaurante sea único. Su pasión por la gastronomía, su compromiso con la excelencia y su enfoque en brindar un servicio excepcional hacen que cada visita sea una experiencia memorable para nuestros clientes.
        </p>
      </div>
    </div>
  );
};

export default Nosotros;
