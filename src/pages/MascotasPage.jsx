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
  
  useEffect(() =>{
    fetchMascotas();
  },[])

  return(
    <div>
      <h2>Listado de Mascotas</h2>
      {listaMascotas.length === 0 ? ( // Acá el operador ternario pa
        <p>No hay mascotas todavía</p>
      ) : (
        <ul>
          {listaMascotas.map((m) => (
            <li key={m.id}>
              <img src={m.imagen} alt={m.nombre} width="120" />
              <p>Nombre: <strong>{m.nombre}</strong></p>
              <p>Descripción: {m.descripcion}</p>
              <p>Estado: {m.estado}</p>
              <p>Tipo: {m.tipo_animal}</p>
              <p>Raza: {m.raza}</p>
              <p>Edad: {m.edad}</p>
              <p>Sexo: {m.sexo}</p>
              <p>Tamaño: {m.tamano}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
) 
    





}

export default MascotasPage;