import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import Reserva from '../img/reserva.jpg';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from "react-router-dom";


export default function Reservar() {
  let navigate = useNavigate();
  const [capacidad, setNumPersonas] = useState('');
  const [fecha, setFechaReserva] = useState();
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [mostrarSeleccionHora, setMostrarSeleccionHora] = useState(false);
  const [hora, setHoraReserva] = useState('');
  const [mensajeColor, setMensajeColor] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [dni, setDni] = useState(''); // Agregar estado para el campo DNI
  const [nombre, setNombre] = useState('');
  const [mesa, setMesa] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleNumPersonasChange = (e) => {
    setNumPersonas(e.target.value);
    setMostrarCalendario(true);
  };

  const handleFechaReservaChange = (date) => {
    console.log(date.toISOString());
    setFechaReserva(date);
    setMostrarSeleccionHora(true);
  };

  const handleDniChange = (e) => {
    setDni(e.target.value);
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleHoraReservaChange = (e) => {
    setHoraReserva(e.target.value);
  };

  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);

  const filterDate = (date) => {
    return date.getDay() !== 2; // Filtrar los martes (2 representa el martes) porque el restaurante cierra en este día
  };

  const buscarMesasDisponibles = () => {
    // Construir el objeto de datos a enviar al backend
    const reservaData = {
      capacidad: parseInt(capacidad),
      fecha,
      hora
    };

    // Realizar la solicitud POST al backend
    fetch('http://localhost:8080/buscarMesas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reservaData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud de reserva: ' + response.status);
      }
      return response.json(); // Analizar la respuesta del backend y devolver la promesa
    })
    .then(data => {
      if(data.length!=0){
        const mesa = data[0].id;
        console.log(mesa);
        setMesa(mesa);
        setMostrarFormulario(true); // Mostrar el formulario
      }
      else{
        console.log("No se encuenta ninguna mesa disponible");
        setErrorMessage('En este momento no existe ninguna mesa disponible para esta fecha');
        setSuccessMessage("");
      }
    })
    .catch(error => {
      // Manejar cualquier error que ocurra durante la solicitud
      console.error('Error al enviar la solicitud de reserva:', error);
    });
  };

  const enviarReserva = (e) => {
    e.preventDefault();
    const reservaCompletaData = {
      fecha,
      hora,
      dni,
      nombre,
      mesa
    };
    console.log(reservaCompletaData);
    fetch('http://localhost:8080/realizarReserva', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reservaCompletaData)
    })
    .then(response => {
      console.log(reservaCompletaData);
      return response.text();
    })
    .then(data => {
      if(data == "true"){
        console.log("¡Reserva realizada exitosamente!");
        setSuccessMessage('¡Reserva realizada exitosamente!');
        setErrorMessage("");
        alert("¡Reserva realizada exitosamente!");
        navigate("/");
      }
      else {
        setErrorMessage('Hubo un error al realizar la reserva.');
        setSuccessMessage("");
      }
    })
    .catch(error => {
      console.error('Error al enviar la reserva:', error);
      setErrorMessage('Hubo un error al realizar la reserva.');
      setSuccessMessage("");
    });
  };

  const handleReservaSubmit = () => {
    buscarMesasDisponibles();
  };

  const generateTimeOptions = (startHour, endHour) => {
    const timeOptions = [];
    const intervalMinutes = 30;

    let currentHour = startHour;
    while (currentHour <= endHour) {
      for (let minutes = 0; minutes < 60; minutes += intervalMinutes) {
        const formattedHour = `${currentHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        timeOptions.push(formattedHour);
      }
      currentHour++;
    }

    return timeOptions;
  };

  const comidaTimeOptions = generateTimeOptions(13, 16);
  const cenaTimeOptions = generateTimeOptions(19, 23);


  return (
    <div>
      <div className='fotoCarta'>
        <img src={Reserva} alt='Foto carta' />
        <div className="textoSobreImagenRe">
          <p>Reserva tu mesa y disfruta de nuestros servicios</p>
        </div>
      </div>
      {!mostrarFormulario && ( // Mostrar los elementos normales de la página si no se debe mostrar el formulario
        <div className='containerReserva'>
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <h1 className='mb-5'>Reserva tu mesa</h1>
          <div class="mb-5">
            <label class="form-label">Número de Personas:</label>
            <input type="number" value={capacidad} min={1} max={20} onChange={handleNumPersonasChange} className="form-control" />
          </div>
          {mostrarCalendario && (
            <div class="mb-5">
              <label class="form-label">Fecha de Reserva:</label>
              <DatePicker selected={fecha} onChange={handleFechaReservaChange} minDate={today} maxDate={maxDate} filterDate={filterDate} placeholderText="Seleccione una fecha" dateFormat='dd/MM/yyyy' className="form-control" />
            </div>
          )}

          {mostrarSeleccionHora && (
            <div class="mb-5">
              <label class="form-label">Hora de Reserva:</label>
              <select value={hora} onChange={handleHoraReservaChange} className="form-control">
                <option value="">Seleccione una hora</option>
                <optgroup label="Comida">
                  {comidaTimeOptions.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </optgroup>
                <optgroup label="Cena">
                  {cenaTimeOptions.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          )}

          {hora && (
            <button onClick={handleReservaSubmit} className="submitAdmin btn btn-primary mb-5">Enviar Reserva</button>
          )}

          {/* {mensajeColor && (
            <p style={{ color: mensajeColor }}>
              {mensajeColor === 'green' ? 'Hay mesas disponibles' : 'No se encuentra ninguna mesa disponible'}
            </p>
          )} */}

        </div>
      )}

      {mostrarFormulario && ( // Mostrar el formulario si se debe mostrar
        <div className='containerReserva'>
          <h2 className='mb-5'>Inserta tus datos para terminar la reserva</h2>
          <form>
            <div className='mb-3'>
              <label class="form-label">DNI:</label>
              <input type="text" value={dni} onChange={handleDniChange} maxLength={9} className="form-control" />
            </div>
            <div className='mb-3'>
              <label class="form-label">Nombre:</label>
              <input type="text" value={nombre} onChange={handleNombreChange} maxLength={50} className="form-control" />
            </div>

            <button onClick={enviarReserva} className="submitAdmin btn btn-primary mb-3">Enviar</button>
          </form>

          <div>
            <a href='/reservar' className="nueva btn btn-primary">Nueva reserva</a>
          </div>
        </div>
      )}
    </div>
  );
}
