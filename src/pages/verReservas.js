import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';



export default function VerReservas(){
    const [reservas, setReservas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [mesas, setMesas] = useState([]);

    useEffect(() => {
        loadReservas();
    }, []);

    useEffect(() => {
      loadMesas();
    }, []);

    const loadReservas = async() => {
        const result = await axios.get("http://localhost:8080/verreservas")
        setReservas(result.data);
    }

    const loadMesas = async () => {
      try {
        const result = await axios.get('http://localhost:8080/verMesas');
        setMesas(result.data);
      } catch (error) {
        console.error('Error al cargar las mesas', error);
      }
    };

    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const filteredReserva= reservas.filter((reserva) => {
      const searchQuery = searchTerm.toLowerCase();
      return (
        reserva.nombre.toString().includes(searchQuery) ||
        reserva.dni.toString().includes(searchQuery)
      );
    });

    
if (sessionStorage.getItem('role')){
  return (
    <div class='container'>
       <div className='py-4'>
       <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
          {reservas.length > 0 && (
            // En caso de quwe haya reservas
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">Nº de mesa</th>
                  <th scope="col">Comentario</th>
                  <th scope="col">Capacidad</th>
                  <th scope="col">DNI</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Fecha</th>
                  <th>Hora</th>
                </tr>
              </thead>
              <tbody>
                {filteredReserva
                  .filter(reserva => moment(reserva.fecha).isSameOrBefore(moment().add(1, 'month'), 'day'))
                  .map((reserva, index) => {
                    const formattedFecha = moment(reserva.fecha).format('DD-MM-YYYY');
                    return (
                      <tr key={index}>
                        {mesas.map((mesa) => {
                          if (reserva.mesa === mesa.id) {
                            return (
                              <React.Fragment key={mesa.id}>
                                <th scope="row">{mesa.numero}</th>
                                <td>{mesa.comentario}</td>
                                <td>{mesa.capacidad}</td>
                                <td>{reserva.dni}</td>
                                <td>{reserva.nombre}</td>
                                <td>{formattedFecha}</td>
                                <td>{reserva.hora}</td>
                              </React.Fragment>
                            );
                          }
                        })}
                      </tr>
                    );
                })}
              </tbody>
            </table>
          )}

          
          {reservas.length == 0 &&  (
            // En caso de que no haya reservas
            <div class="card noreserva">
              <div class="card-body">
                <p class="card-text">No hay reservas</p>
              </div>
            </div>
          )}
        </div>

        <button class='btn btn-outline-primary mx-2 volveratras botoncito'><a href="/homeadmin">Volver atrás</a></button>
    </div>
  )
}
else{
    alert("No tienes permisos para ver esta página!");
    window.location.href = '/loginUser';
}
}