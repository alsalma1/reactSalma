import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function PrincipalPage() {

    const [resenyas, setResenyas] = useState([]);
    let navigate = useNavigate();

    //Ofertas especiales
    const [platos, setPlatos] = useState([]);
    useEffect(() => {
        loadPlatos();
    }, []);

    const loadPlatos = async() => {
        const result = await axios.get("http://localhost:8080/verplatos")
        setPlatos(result.data);
    }

    //Reseñas
    const [comentario, setcomentario] = useState({
        id:"",
        resenya: "",
        email_cliente: "",
    });

    const {id, resenya, email_cliente} = comentario;

    const onInputChange = (e) => {
        setcomentario({ ...comentario, [e.target.name]: e.target.value });
    };
    

      const onSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:8080/crearComentario", comentario);
        navigate("/carta");
    };

    //Mostrar reseñas
    useEffect(() => {
        loadResenyas();
    }, []);

    const loadResenyas = async() => {
        const result = await axios.get("http://localhost:8080/resenyas")
        setResenyas(result.data);
    }

    return(
        <div id="contenedorpaginaprincipal">
            <div className="container" id="inicio">
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
            </div>
                <div className="image-container">
                    <img class="restaurant-image" src="img.jpg" alt="Restaurant" />
                </div>
            
            <div class="container">

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

            <div class="contenedorofertas">
                <h1>Ofertas especiales</h1>
                <div class="ofertas">
                    {platos
                        .filter(plato=> plato.especial==1 && plato.estadop==1)
                        .slice(0, 4) 
                        .map((plato, index) => {
                            return (
                                <div class="card mb-3">
                                    <img class="card-img-top" src={process.env.PUBLIC_URL + `/img/${plato.imagen}`} alt={plato.titulo}></img>
                                    <div class="card-body">
                                        <h5 class="card-title">{plato.titulo}</h5>
                                        <p class="card-text">{plato.descripcion}</p>
                                        <p class="card-text"><small class="text-muted">{plato.precio}€</small></p>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
            <div class="resenyas">
                <h1>Reseñas</h1>
                <p class="cursiva">¡Envía tu comentario! Nos importa la opinión de nuestros clientes</p>
                <div class="containerresenya">
                <form onSubmit={(e) => onSubmit(e)}>
                        <input type={"text"} className="form-control" placeholder="Deja tu reseña" name="resenya" value={resenya} onChange={(e) => onInputChange(e)} required/>
                        <input type={"text"} className="form-control" placeholder="Email" name="email_cliente" value={email_cliente} onChange={(e) => onInputChange(e)} required/>
                    <button type="submit" className="btn btn-outline-primary botoncito">Enviar</button>
                </form>
                </div>
            </div>
            <div class="contenedorresenyas">
                {resenyas.reverse().slice(0, 5).map((resenya, index) => (
                    <div class="row">
                    <div class="cursiva">"{resenya.resenya}"</div>
                    </div>
                ))}
            </div>
        </div>
    )

}