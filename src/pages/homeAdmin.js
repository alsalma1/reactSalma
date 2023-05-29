import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Mesas from './../img/mesas.png';
import Platos from './../img/platos.png';
import Reservas from './../img/reservas.png';

export default function Home() {

if (sessionStorage.getItem('role')){
    return (
        <div className="containeradmin">
            <div className="card">
                <img className="card-img-top" src={Platos} alt="Card image cap"></img>
                <div className="card-body">
                    <h5 className="card-title">Platos</h5>
                    <p className="card-text">Administrar menú</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><a href="crearplato" className="card-link">Crear platos</a></li>
                    <li className="list-group-item"><a href="verPlatos" className="card-link">Ver platos</a></li>
                </ul>
            </div>


            <div className="card">
                <img className="card-img-top" src={Mesas} alt="Card image cap"></img>
                <div className="card-body">
                    <h5 className="card-title">Mesas</h5>
                    <p className="card-text">Distribución de mesas</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><a href="/mesa" className="card-link">Crear mesas</a></li>
                    <li className="list-group-item"><a href="/vermesa" className="card-link">Editar mesas</a></li>
                </ul>
            </div>


            <div className="card">
                <img className="card-img-top" src={Reservas} alt="Card image cap"></img>
                <div className="card-body">
                    <h5 className="card-title">Reservas</h5>
                    <p className="card-text">Gestión de reservas</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><a href="verReservas" className="card-link">Ver reservas</a></li>
                </ul>
            </div>
        </div>
    )
}
else{
    alert("No tienes permisos para ver esta página!");
    window.location.href = '/loginUser';
}
}
