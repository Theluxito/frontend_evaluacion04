import { Route, Routes } from 'react-router-dom';
import MascotasPage from './pages/MascotasPage'
import ComentariosDetallesPage from "./pages/ComentariosDetallesPage"
import './component/App.css'

function App(){
    return(
        <>
                <header>
                    <nav>
                        <h1 className=''><strong>Página de mascotas</strong></h1>
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