import MascotasList from "../component/mascotas/MascotasList";
import MascotasForm from "../component/mascotas/MascotasForm";
import api from "../services/Api";
import { useEffect, useState } from "react";

function MascotasPage() {
  const [listaMascotas, setListaMascotas] = useState([]);

  const fetchMascotas = async () => {
    try {
      const response = await api.get("mascotas/");
      if (response.status === 200) {
        setListaMascotas(response.data);
      }
    } catch (error) {
      if(error.response?.status === 404){
        alert("No se encontraron mascotas DX")
      }else{
        alert("Error al cargar las mascotas u.u")
      }
    }
  };

  const deleteMascota = async (id) => {
    try{
      await api.delete(`mascotas/${id}/`)
      alert("Mascota eliminada :'v")
    }catch(error){
      if(error.response?.status === 400){
        alert("Error de validación " + JSON.stringify(error.response?.data))
      }else if(error.response?.status === 404){
        alert("Mascota no encontrada...")
      }else if(error.response?.status === 401){
        alert("No tiene autorización para eliminar!")
      }else{
        alert("No se pudo eliminar la mascota :<")
      }
    }finally {
      fetchMascotas()
    }
  }
  
  useEffect(() =>{

    const fetchMascotas = async () => {
    try {
      const response = await api.get("mascotas/");
      if (response.status === 200) {
        setListaMascotas(response.data);
      }
    } catch (error) {
      if(error.response?.status === 404){
        alert("No se encontraron mascotas DX")
      }else{
        alert("Error al cargar las mascotas u.u")
      }
    }
  };

    fetchMascotas();
  },[])

  return(
    <>
      <MascotasForm onMascotaCreada={fetchMascotas}/>
      <MascotasList listamascotas={listaMascotas} onDeleteMascota={deleteMascota}/>
    </>
) 
    

}

export default MascotasPage;