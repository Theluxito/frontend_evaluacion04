import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/Api";
import ComentariosList from "../component/comentarios/ComentariosList";

function ComentariosDetallesPage(){
    const {id} = useParams()
    const [mascota, setMascota] = useState(null)

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

  useEffect(() => {
    fetchMascota(id)
  }, [])
    
        return (
        <div>
            <img src={mascota?.imagen} alt={"imagen mascota"} width="120" />
            <p><strong>Nombre: {mascota?.nombre}</strong></p>
            <p>Descripcion: {mascota?.descripcion}</p>
            <p>Estado: {mascota?.estado}</p>
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