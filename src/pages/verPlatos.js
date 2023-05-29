import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function VerPlatos(){
    const [platos, setPlatos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadPlatos();
    }, []);

    const loadPlatos = async() => {
        const result = await axios.get("http://localhost:8080/verplatos")
        setPlatos(result.data);
    }

    const handleEstadoClick = async (platoId, estadoActual) => {
        const nuevoEstado = estadoActual == 1 ? 0 : 1;
    
        const updateEstado = platos.map((plato) => {
          if (plato.id === platoId) {
            return { ...plato, estadop: nuevoEstado };
          }
          return plato;
        });
    
        try {
          await axios.put(`http://localhost:8080/actualizarestado/${platoId}`, { estadop: nuevoEstado });
          setPlatos(updateEstado);
        } catch (error) {
          console.error('Error al actualizar el estado del plato', error);
        }
      };

      const handleEspecialClick = async (platoId, estadoActual) => {
        const nuevoEstado = estadoActual == 1 ? 0 : 1;
    
        const updateEspecial = platos.map((plato) => {
          if (plato.id === platoId) {
            return { ...plato, especial: nuevoEstado };
          }
          return plato;
        });
    
        try {
          await axios.put(`http://localhost:8080/actualizarespecial/${platoId}`, { especial: nuevoEstado });
          setPlatos(updateEspecial);
        } catch (error) {
          console.error('Error al actualizar el estado del plato', error);
        }
      };

      const handleSearch = (e) => {
        setSearchTerm(e.target.value);
      };

      const filteredPlatos= platos.filter((plato) => {
        const searchQuery = searchTerm.toLowerCase();
        return (
          plato.titulo.toString().includes(searchQuery) ||
          plato.precio.toString().includes(searchQuery) ||
          plato.descripcion.toLowerCase().includes(searchQuery) ||
          (plato.estadop === 1 ? 'activado' : 'desactivado').includes(searchQuery)
        );
      });
if (sessionStorage.getItem('role')){
  return (
    <div class='container'>
        <div class='py-4'>
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <table class="table border shadow">
            <thead>
                <tr>
                    <th scope="col">Nº de plato</th>
                    <th scope="col">Imagen</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Especial</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Editar</th>
                </tr>
            </thead>
            <tbody>
                {
                    filteredPlatos.map((plato,index)=>(
                        <tr key={index}>
                            <th scope='row'>{plato.id}</th>
                            <td><img src={process.env.PUBLIC_URL + `/img/${plato.imagen}`} alt={plato.titulo} class="seePlato"/></td>
                            <td>{plato.titulo}</td>
                            <td>{plato.descripcion}</td>
                            <td>{plato.precio}€</td>
                            <td><a class="nodecor" href="http://localhost:3000/verplatos" onClick={() => handleEspecialClick(plato.id, plato.especial)}>{plato.especial == 1 ? 'Sí' : 'No'}</a></td>
                            <td><a class="nodecor" href="http://localhost:3000/verplatos" onClick={() => handleEstadoClick(plato.id, plato.estadop)}>{plato.estadop == 1 ? 'Activado' : 'Desactivado'}</a></td>
                            <td>
                              <Link
                                  to={`/editarPlato/${plato.id}`}
                                  className="btn btn-outline-primary mx-2 botoncito"
                                >
                                  Editar
                              </Link>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
        <button class='btn btn-outline-primary mx-2 volveratras botoncito'><a href="/homeadmin">Volver atrás</a></button>
        <button class='btn btn-outline-primary mx-2 volveratras botoncito'><a href="/crearplato">Crear plato</a></button>
    </div>
    
  )
}
else{
    alert("No tienes permisos para ver esta página!");
    window.location.href = '/loginUser';
}
}
