import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditarMesa() {
  const alerta = document.getElementById("alerta");
  // alerta.style.display = "none";
  let navigate = useNavigate();
  let { id } = useParams();

  const [mesa, setmesa] = useState({
    id: "",
    numero: "",
    capacidad: "",
    comentario: "",
    estado: true,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const { numero, capacidad, comentario, estado } = mesa;

  useEffect(() => {
    const fetchMesa = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/verMesa/${id}`);
        if (response.status === 200) {
          const mesaData = response.data;
          setmesa({
            id: mesaData.id,
            numero: mesaData.numero,
            capacidad: mesaData.capacidad,
            comentario: mesaData.comentario,
            estado: mesaData.estado,
          });
        } else {
          setErrorMessage("Mesa not found");
        }
      } catch (error) {
        setErrorMessage("Error fetching mesa: " + error.message);
      }
    };

    fetchMesa();
  }, [id]);

  const onInputChange = (e) => {
    setmesa({ ...mesa, [e.target.name]: e.target.value });
  };

  const onCheckboxChange = (e) => {
    setmesa({ ...mesa, [e.target.name]: e.target.checked });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/editarMesa", mesa);
      if (response.status === 200) {
        setAlertMessage("Mesa editada con éxito");
        navigate("/vermesa"); // Redirect to the mesa list page
      } else {
        setErrorMessage("Error al editar la mesa");
      }
    } catch (error) {
      console.log("Error al crear la mesa: " + error.message);
      setErrorMessage("Ya existe una mesa con el mismo número");
    }
  };
  if (sessionStorage.getItem('role')){
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Editar Mesa</h2>
          <div className="alert alert-danger" role="alert" id="alerta">
            {errorMessage}
          </div>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="numero" className="form-label">
                Numero
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Numero"
                name="numero"
                value={numero}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="capacidad" className="form-label">
                Capacidad
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Capacidad"
                name="capacidad"
                value={capacidad}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="comentario" className="form-label">
                Comentario
              </label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Comentario"
                name="comentario"
                value={comentario}
                onChange={(e) => onInputChange(e)}
                required
              ></textarea>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="estado"
                checked={estado}
                onChange={(e) => onCheckboxChange(e)}
              />
              <label className="form-check-label" htmlFor="estado">
                Estado
              </label>
            </div>
            <button type="submit" className="btn btn-outline-primary">
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
