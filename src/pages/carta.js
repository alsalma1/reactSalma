import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Platos from './../img/platos.png';
import Modal from 'react-modal';

// Establecer el elemento raíz para el modal
Modal.setAppElement('#root');

export default function Carta() {
  const [platos, setPlatos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    obtenerPlatos();
  }, []);

  const obtenerPlatos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/carta');
      setPlatos(response.data);
      setModalIsOpen(new Array(response.data.length).fill(false));
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (index) => {
    const updatedModalIsOpen = [...modalIsOpen];
    updatedModalIsOpen[index] = true;
    setModalIsOpen(updatedModalIsOpen);
  };

  const closeModal = (index) => {
    const updatedModalIsOpen = [...modalIsOpen];
    updatedModalIsOpen[index] = false;
    setModalIsOpen(updatedModalIsOpen);
  };

  const filteredPlatos = platos.filter((plato) => {
    return (
      plato.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plato.precio.toString().includes(searchTerm)
    );
  });

  return (
    <div>
      <div className='fotoCarta'>
        <img src={Platos} alt='Foto carta' />
        <div className='textoSobreImagen'>
          <h1>Sabor Badalona</h1>
          <p>Carta</p>
        </div>
      </div>

      {/* BUSCADOR */}
      <div className="container mb-3">
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar platos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container" style={{ marginBottom: '50px' }}>
        <div className="row">
          {filteredPlatos.length === 0 ? (
            <h1>No se encontraron resultados.</h1>
          ) : (
            filteredPlatos.map((plato, index) => {
              return (
                <div key={plato.id} className="col-lg-4 col-md-6 mb-4" >
                  <div className="card h-100">
                    <div className="card-body d-flex">
                      <div className="plato-imagen">
                        <a href="#" onClick={() => openModal(index)}>
                          <img
                            src={process.env.PUBLIC_URL + `/img/${plato.imagen}`}
                            alt={plato.titulo}
                            className="rounded-circle"
                            style={{ width: '150px', height: '150px' }}
                          />
                        </a>
                      </div>
                      <div className="plato-info ms-3">
                        <h5 className="card-title">{plato.titulo}</h5>
                        <p className="card-text">{plato.precio}€</p>
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="card-text">{plato.descripcion}</p>
                    </div>
                  </div>
                  <Modal
                    isOpen={modalIsOpen[index]}
                    onRequestClose={() => closeModal(index)}
                    contentLabel="Imagen"
                    className="custom-modal"
                  >
                    <div className="modal-content">
                      <img
                        className="modalCarta"
                        src={process.env.PUBLIC_URL + `/img/${plato.imagen}`}
                        alt={plato.titulo}
                      />
                      <button onClick={() => closeModal(index)}>Cerrar</button>
                    </div>
                  </Modal>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
