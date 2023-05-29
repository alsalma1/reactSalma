import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function VerMesas() {
  const [mesas, setMesas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadMesas();
  }, []);

  const loadMesas = async () => {
    try {
      const result = await axios.get('http://localhost:8080/verMesas');
      setMesas(result.data);
    } catch (error) {
      console.error('Error al cargar las mesas', error);
    }
  };

  const handleEstadoClick = async (mesaId, estadoActual) => {
    const nuevoEstado = estadoActual === 1 ? 0 : 1;

    const updateEstado = mesas.map((mesa) => {
      if (mesa.id === mesaId) {
        return { ...mesa, estado: nuevoEstado };
      }
      return mesa;
    });

    try {
      await axios.put(`http://localhost:8080/actualizarestadoMesa/${mesaId}`, {
        estado: nuevoEstado,
      });
      setMesas(updateEstado);
    } catch (error) {
      console.error('Error al actualizar el estado de la mesa', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMesas = mesas.filter((mesa) => {
    const searchQuery = searchTerm.toLowerCase();
    return (
      mesa.numero.toString().includes(searchQuery) ||
      mesa.capacidad.toString().includes(searchQuery) ||
      mesa.comentario.toLowerCase().includes(searchQuery) ||
      (mesa.estado === 1 ? 'activado' : 'desactivado').includes(searchQuery)
    );
  });

  return (
    <div className="container">
      <div className="py-4">
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Nº de mesa</th>
              <th scope="col">Capacidad</th>
              <th scope="col">Comentario</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredMesas.map((mesa, index) => (
              <tr key={index}>
                <td>{mesa.numero}</td>
                <td>{mesa.capacidad}</td>
                <td>{mesa.comentario}</td>
                <td>
                  <a
                    className="nodecor"
                    href="#"
                    onClick={() => handleEstadoClick(mesa.id, mesa.estado)}
                  >
                    {mesa.estado == 1 ? 'Activado' : 'Desactivado'}
                  </a>
                </td>
                <td>
                  <Link
                    to={`/editarmesa/${mesa.id}`}
                    className="btn btn-outline-primary mx-2 botoncito"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button class='btn btn-outline-primary mx-2 volveratras botoncito'><a href="/homeadmin">Volver atrás</a></button>
      <button class='btn btn-outline-primary mx-2 volveratras botoncito'><a href="/mesa">Crear mesa</a></button>
    </div>
  );
}
