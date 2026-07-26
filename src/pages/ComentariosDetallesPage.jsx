import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/Api";

function ComentariosDetallesPage(){
    const {id} = useParams()
    const [mascota, setMascota] = useState(null)

    const fetchMascota = async (id) => {
    try {
      const response = await api.get(`mascotas/${id}/`);
      console.log(response);

      if (response.status === 200) {
        
      }
    } catch (error) {
      
    }
  };

  useEffect(() => {
    fetchMascota(id)
  }, [])
    
    return (
  <div>
    <h1>Detalle de mascota</h1>
    <p>ID: {id}</p>
  </div>
);
}

export default ComentariosDetallesPage;