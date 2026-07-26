import { NavLink, Route, Routes } from 'react-router-dom';
import MascotasPage from './pages/MascotasPage'

function App(){
    return(
        <>
            <h1><strong>Página de mascotas</strong></h1>
                <header>
                    <nav>
                        <MascotasPage/> 
                    </nav>
                </header>

            {/* <Routes>
            </Routes> */}
        </>
    )
    //hacer hijos de mascotaspages (ver detalles, formulario para subir una mascota)
}

export default App;