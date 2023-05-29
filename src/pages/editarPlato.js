import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function EditarPlato() {
  let navigate = useNavigate();
  const [plato, setPlato] = useState({
    id: '',
    descripcion: '',
    titulo: '',
    precio: 0,
    imagen: null,
    estadop: true,
    especial: false,
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchPlato = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getPlatosById/${id}`);
        if (response.status === 200) {
          const platoData = response.data;
          setPlato(platoData);
        } else { 
          console.log('Plato no encontrado');
        }
      } catch (error) {
        console.log('Error fetching plato:', error.message);
      }
    };

    fetchPlato();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlato((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPlato((prevState) => ({
      ...prevState,
      imagen: file,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPlato((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('file', plato.imagen);
      formData.append('descripcion', plato.descripcion);
      formData.append('titulo', plato.titulo);
      formData.append('precio', plato.precio);
      formData.append('estadop', plato.estadop);
      formData.append('especial', plato.especial);
      formData.append('imagen', plato.imagen);


      const response = await axios.put(`http://localhost:8080/editar/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('Plato editado');
        alert("Plato editado con éxito")
        navigate('/verPlatos');
        //window.location.href = '/verPlatos';
      } else {
        console.log('Error editing plato');
      }
    } catch (error) {
      console.log('Error editing plato:', error.message);
    }
  };
  
  if (sessionStorage.getItem('role')){
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Editar Plato</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">
                Descripción
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Descripción"
                name="descripcion"
                value={plato.descripcion}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="titulo" className="form-label">
                Título
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Título"
                name="titulo"
                value={plato.titulo}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="precio" className="form-label">
                Precio
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Precio"
                name="precio"
                value={plato.precio}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="imagen" className="form-label">
                Imagen
              </label>
              <input
                type="file"
                className="form-control"
                name="imagen"
                onChange={handleImageChange}
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="estadop"
                checked={plato.estadop}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="estadop">
                Estado
              </label>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="especial"
                checked={plato.especial}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="especial">
                Especial
              </label>
            </div>

            <button type="submit" className="btn btn-primary">
              Editar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
else{
  alert("No tienes permisos para ver esta página!");
  window.location.href = '/loginUser';
}
}
