import Metro from './../img/metro.png';
import Tren from './../img/tren.png';
import Bus from './../img/bus.png';

import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function ContactForm() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [countdown, setCountdown] = useState(20);

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formData = {
          name: name,
          email: email,
          message: message
        };
      
        setIsProcessing(true);
    
        try {
          axios.post('http://localhost:8080/contacto', formData)
            .then(() => {
              setIsProcessing(false);
              setSuccessMessage("Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo lo antes posible.");
            })
            .catch(() => {
              setIsProcessing(false);
              setErrorMessage("Ha ocurrido un error. Por favor, inténtalo nuevamente más tarde.");
            })
        } catch (error) {
          console.error(error);
          setIsProcessing(false);
          setErrorMessage("Ha ocurrido un error ¡Por favor intentalo en otro momento!");
          setSuccessMessage("");
        }
      };
      
      useEffect(() => {
        let intervalId = null;
    
        if (isProcessing && countdown > 0) {
          intervalId = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
          }, 1000);
        } else {
          clearInterval(intervalId);
        }
    
        return () => {
          clearInterval(intervalId);
        };
      }, [isProcessing, countdown]);
      
    return(
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="container d-flex justify-content-center formContact">
              <div style={{ width: '80%' }}>
                <h2>FORMULARIO DE CONTACTO</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col">
                      <input type="text" className="form-control" id="name" placeholder="Nombre" required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="col">
                      <input type="email" className="form-control" id="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <textarea className="form-control mt-5 mb-5" id="message" rows="4" placeholder="¡Deja aquí tu mensaje!" required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    </div>
                  </div>
                  {/* Mensaje de carga */}
                  {isProcessing && (
                    <div className="alert alert-info" role="alert">
                      Enviando mensaje... ¡Esto puede tardar unos segundos! ({countdown}s)
                    </div>
                  )}
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  {successMessage && (
                    <div className="alert alert-success" role="alert">
                      {successMessage}
                    </div>
                  )}
                  <div className="row">
                    <div className="col">
                    {!isProcessing && !successMessage && (
                    <button type="submit" className="btn btn-primary mb-3">
                      Enviar Mensaje
                    </button>
                  )}            
                  </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          </div>
          <div className="row">
            <div className="col">
              <div id="mapa">
                <div>
                  <h1 className='nuestrolocal'>Nuestro local</h1>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2990.39071916609!2d2.2346609881057087!3d41.452440297269376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4bb7236bf4449%3A0xc6b13e5d825a85a7!2sInstitut%20La%20Pineda!5e0!3m2!1sca!2ses!4v1684312503612!5m2!1sca!2ses" width="850" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                  <p><img src={Metro} alt="Logo" width="20px" height="20px" class="me-2 img-fluid" /><b>L2</b> Badalona Pompeu Fabra</p>
                  <p><img src={Tren} alt="Logo" width="20px" height="20px" class="me-2 img-fluid" /><b>R1</b>Badalona</p>
                  <p><img src={Bus} alt="Logo" width="20px" height="20px" class="me-2 img-fluid" /><b>M1</b> Santa Coloma de G. Pl. Quinze de juny</p>
                </div>
              </div>
          </div>
          </div>
        </div>
    )
}