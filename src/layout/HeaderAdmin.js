import React from 'react';
import Logo from './../img/Sabor_Badalona.png';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const handleDestroySession = () => {
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('role');
  window.location.href = '/loginUser';
};

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <a href="/homeadmin">
            <img src={Logo} alt="Logo" width="200" height="200" className="me-2 img-fluid" />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/verPlatos">
                  Platos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="vermesa">
                  Mesas
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="verReservas">
                  Reservas
                </a>
              </li>
            </ul>
          </div>

          {sessionStorage.getItem('username') ? (
            <div>
              <button className="btn btn-outline-primary logout-btn" onClick={handleDestroySession}>
                LogOut
              </button>
            </div>
          ) : (
            <div>
              <Link className="btn btn-outline-primary logout-btn" to="/loginUser">
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

