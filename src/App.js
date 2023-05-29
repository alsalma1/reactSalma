import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Home from './pages/homeAdmin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrincipalPage from './pages/homeUser';
import Horario from './pages/horario';
import HeaderAdmin from './layout/HeaderAdmin';
import Mesa from './pages/mesas';
import VerMesa from './pages/verMesas';
import EditarMesa from './pages/editarMesa';
import EditarPlato from './pages/editarPlato';
import AddUser from './users/addUser';
import LoginUser from './users/loginUser';
import VerPlatos from './pages/verPlatos';
//import Platos from './pages/platos';
import CrearPlato from './pages/crearPlato';
import Contacto from './pages/contacto';
import VerReservas from './pages/verReservas';
import Reservar from './pages/reservar';
import Carta from './pages/carta';
import Nosotros from './pages/nosotros'


function App() {
  return <div className="App">
      <Router>
        {!sessionStorage.getItem('role') && <Navbar />}
        {sessionStorage.getItem('role') && <HeaderAdmin />}
        <Routes>
          <Route exact path="/" element={<PrincipalPage/>}/>
          <Route exact path="/homeadmin" element={<Home/>}/>
          <Route exact path="/adduser" element={<AddUser/>}/>
          <Route exact path="/loginUser" element={<LoginUser/>}/>
          <Route exact path="/horario" element={<Horario/>}/>
          <Route exact path="/verPlatos" element={<VerPlatos/>}/>
          <Route exact path="/crearplato" element={<CrearPlato/>}/>
          <Route exact path="/verReservas" element={<VerReservas/>}/>
          <Route exact path="/carta" element={<Carta/>}/>
          <Route exact path="/contacto" element={<Contacto/>}/>
          <Route exact path="/mesa" element={<Mesa/>}/>
          <Route exact path="/vermesa" element={<VerMesa/>}/>
          <Route exact path="/editarMesa/:id" element={<EditarMesa/>}/>
           <Route exact path="/editarPlato/:id" element={<EditarPlato/>}/>
           <Route exact path="/Reservar" element={<Reservar/>}/>
           <Route exact path="/nosotros" element={<Nosotros/>}/>
        </Routes>
        {/* <Footer/> */}
      </Router>

    </div>
}

export default App;
