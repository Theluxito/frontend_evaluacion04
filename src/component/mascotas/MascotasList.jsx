import { useNavigate } from "react-router-dom";

function MascotasList ({listamascotas}){
    const navegate = useNavigate()

    const handleVerDetalles = (id) => {
        navegate(`/comentarios-detalles/${id}`)
    } 

    return(
         <div>
      <h2>Listado de Mascotas</h2>
      {listamascotas.length === 0 ? ( // Acá el operador ternario pa
        <p>No hay mascotas todavía</p>
      ) : (
        <ul>
          {listamascotas.map((m) => (
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
              <button onClick={() => handleVerDetalles(m.id)}>Ver Detalles</button>
            </li>
          ))}
        </ul>
      )}
    </div>
    )
}


export default MascotasList;