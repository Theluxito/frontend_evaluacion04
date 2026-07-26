import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import MascotasPage from './pages/MascotasPage'
import ComentariosDetallesPage from "./pages/ComentariosDetallesPage"
import { Navigate } from 'react-router-dom';

function App(){
    return(
        <>
                <header>
                    <nav>
                        <h1><strong>Página de mascotas</strong></h1>
                        <NavLink to="/formulario" >Inscribe a tu mascota aqui</NavLink>
                    </nav>
                </header>

            <Routes>
                <Route path='/' element={<MascotasPage/>} />
                <Route path='/comentarios-detalles/:id' element={<ComentariosDetallesPage/>} />
            </Routes>
        </>
    )
}

export default App;