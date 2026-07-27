import MascotasList from "../component/mascotas/MascotasList";
import MascotasForm from "../component/mascotas/MascotasForm";
import api from "../services/Api";
import { useEffect, useState } from "react";

function MascotasPage() {
  const [listaMascotas, setListaMascotas] = useState([]);

  const fetchMascotas = async () => {
    try {
      const response = await api.get("mascotas/");
      console.log(response);

      if (response.status === 200) {
        setListaMascotas(response.data);
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  const deleteMascota = async (id) => {
    try{
      await api.delete(`mascotas/${id}/`)
      alert("Mascota eliminada :'v")
      fetchMascotas()
    }catch(error){
      console.error("Error al eliminar mascota", error.response?.data)
      alert("No se pudo eliminar la mascota :<")
    }
  }
  
  useEffect(() =>{
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