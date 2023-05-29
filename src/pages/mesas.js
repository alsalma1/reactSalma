import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Mesas() {
    const alerta = document.getElementById("alerta");
    // alerta.style.display = "none";
    let navigate = useNavigate();
    
    const [mesa, setmesa] = useState({
      id: "",
      numero: "",
      capacidad: "",
      comentario: "",
      estado: true,
    });
  
     const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
  
    const { id, numero, capacidad, comentario, estado} = mesa;
  
    const onInputChange = (e) => {
      setmesa({ ...mesa, [e.target.name]: e.target.value });
    };
  
    const onCheckboxChange = (e) => {
      setmesa({ ...mesa, [e.target.name]: e.target.checked });
    };
  
    const onSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post("http://localhost:8080/crearMesa", { ...mesa, estadop: Boolean(mesa.estado) });
          setSuccessMessage("¡Plato creado con éxito!");
          setErrorMessage("");
          console.log(response.data);
          navigate("/homeadmin");
      } catch (error) {
        console.log(error.response.data);
        if (error.response.data == false) {
          setErrorMessage("¡Ya existe una mesa con el mismo número!");
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
            <h2 className="text-center m-4">Añadir Mesa</h2>
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
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="numero" className="form-label">Número</label>
                <input type={"text"} className="form-control" placeholder="Número" name="numero" value={numero} onChange={(e) => onInputChange(e)} required/>
              </div>
  
  
              <div className="mb-3">
                <label htmlFor="capacidad" className="form-label">Capacidad</label>
                <input type={"number"} className="form-control" placeholder="Capacidad" name="capacidad" value={capacidad} onChange={(e) => onInputChange(e)} required/>
              </div>

              <div className="mb-3">
                <label htmlFor="comentario" className="form-label">Comentario</label>
                <textarea className="form-control" rows="3" placeholder="Comentario" name="comentario" value={comentario} onChange={(e) => onInputChange(e)} required></textarea>
              </div>
  
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" name="Estado" checked={estado} onChange={(e) => onCheckboxChange(e)}/>
                <label className="form-check-label" htmlFor="estado">Estado</label>
              </div>
              <button type="submit" className="btn btn-outline-primary botoncito">Enviar</button>
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