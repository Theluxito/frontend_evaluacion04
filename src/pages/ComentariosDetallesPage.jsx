import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/Api";
import ComentariosList from "../component/comentarios/ComentariosList";

function ComentariosDetallesPage(){
    const {id} = useParams()
    const [mascota, setMascota] = useState(null)
    const [nuevoEstado, setNuevoEstado] = useState("")

    const fetchMascota = async (id) => {
    try {
      const response = await api.get(`mascotas/${id}/`);
      console.log(response.data);

      if (response.status === 200) {
        setMascota(response.data)
      }
    } catch (error) {
      
    }
  };

  const updateEstado = async(id, data) => {
    try {
        const response = await api.patch(`mascotas/${id}/`, data)
        console.log(response)
    } catch (error) {
        console.error(error.response)
    }finally {
        fetchMascota(id)
    }
  }

  useEffect(() => {
    fetchMascota(id)
  }, [])

  const onclickEstado = async (id) => {
    const data = {estado : nuevoEstado}
    console.log(data)
    updateEstado(id, data)
  }
    
        return (
        <div>
            <img src={mascota?.imagen} alt={"imagen mascota"} width="120" />
            <p><strong>Nombre: {mascota?.nombre}</strong></p>
            <p>Descripcion: {mascota?.descripcion}</p>
            <p>Estado : {mascota?.estado === "en_adopcion" ? "En adopción" : mascota?.estado }</p>
            <label>Actualizar Estado:</label>
            <select value={nuevoEstado} onChange={(e) => setNuevoEstado(e.target.value)}>
                <option value="perdida">Perdida</option>    
                <option value="encontrada">Encontrada</option>
                <option value="en_adopcion">En adopción</option>
                <option value="adoptada">Adoptada</option>
            </select> 
            <button onClick={() => onclickEstado(mascota?.id)}>Actualizar estado</button>
            <p>Tipo Animal: {mascota?.tipo_animal}</p>
            <p>raza: {mascota?.raza}</p>
            <p>edad: {mascota?.edad}</p>
            <p>Sexo: {mascota?.sexo}</p>
            <p>Tamaño: {mascota?.tamano}</p>
            <ComentariosList comentarios={mascota?.comentarios ?? []} />
        </div>
)
};

export default ComentariosDetallesPage;