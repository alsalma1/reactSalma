import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CrearPlato() {
  let navigate = useNavigate();

  const [plato, setPlato] = useState({
    titulo: "",
    descripcion: "",
    imagen: "",
    precio: "",
    estadop: true,
    especial: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { titulo, descripcion, precio, imagen, estadop, especial } = plato;

  const onInputChange = (e) => {
    setPlato({ ...plato, [e.target.name]: e.target.value });
  };

  const onCheckboxChange = (e) => {
    setPlato({ ...plato, [e.target.name]: e.target.checked });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("descripcion", descripcion);
      formData.append("imagen", imagen);
      formData.append("precio", precio);
      formData.append("estadop", estadop);
      formData.append("especial", especial);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        "http://localhost:8080/crearplato",
        formData,
        config
      );

      setSuccessMessage("¡Plato creado con éxito!");
      setErrorMessage("");
      navigate("/verPlatos");
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data == false) {
        setErrorMessage("¡Ya existe un plato con el mismo título!");
        setSuccessMessage("");
      }
      else{
        setErrorMessage("¡Error al crear el plato!");
        setSuccessMessage("");
      }
    }
  };
  if (sessionStorage.getItem('role')){
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Añadir plato</h2>
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
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="titulo" className="form-label">
                Título
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Título"
                name="titulo"
                value={titulo}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">
                Descripción
              </label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Descripción"
                name="descripcion"
                value={descripcion}
                onChange={onInputChange}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="imagen" className="form-label">
                Imagen
              </label>
              <input
                type="file"
                className="form-control"
                name="imagen"
                onChange={(e) => {
                  setPlato({ ...plato, imagen: e.target.files[0] });
                }}
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
                value={precio}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="especial"
                checked={especial}
                onChange={onCheckboxChange}
              />
              <label className="form-check-label" htmlFor="especial">
                Especial
              </label>
            </div>
            <button type="submit" className="btn btn-outline-primary botoncito">
              Crear
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
};