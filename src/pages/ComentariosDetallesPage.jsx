import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/Api";
import ComentariosList from "../component/comentarios/ComentariosList";
import "../component/ComentariosDetallesPage.css";

function ComentariosDetallesPage() {
  const { id } = useParams();
  const [mascota, setMascota] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState("");

  const fetchMascota = async (id) => {
    try {
      const response = await api.get(`mascotas/${id}/`);
      if (response.status === 200) {
        setMascota(response.data);
      }
    } catch (error) {
      if (error.response?.status === 404){
        alert("Mascota no encontrada...")
      }else{
        alert("Error al cargar la mascota")
      }
    }
  };

  const updateEstado = async (id, data) => {
    try {
      const response = await api.patch(`mascotas/${id}/`, data);
      if (response.status === 200)
        {alert("Estado actualizado correctamente");}
    } catch (error) {
      if (error.response?.status === 400){
        alert("Error de validación: " + JSON.stringify(error.response?.data))
      }else if (error.response?.status === 404){
        alert("Mascota no encontrada...")
      }else if (error.response?.status === 401){
        alert("No tiene autorización...")
      }else{
        alert("Error inesperado...")
      }
    } finally {
      fetchMascota(id);
    }
  };

  const addComentario = async (data) => {
    try {
      const response = await api.post("comentarios/", data);
      if (response.status === 201)
        {alert("Comentario agregado correctamente")}
    } catch (error) {
      if (error.response?.status === 400){
        alert("Error de validación: " + JSON.stringify(error.response?.data))
      }else if(error.response?.status === 404){
        alert("Mascota no encontrada")
      }else{
        alert("No se pudo agregar el comentario :<")
      }
    } finally {
        fetchMascota(id)
    }
  };

  const deleteComentario = async (comentarioId) => {
    try {
      await api.delete(`comentarios/${comentarioId}/`);
      alert("Comentario eliminado :p");
    } catch (error) {
      if(error.response?.status === 404){
        alert("Comentario no encontrado")
      }else if(error.response?.status === 401){
        alert("No tiene autoorizacioón...")
      }else{
        alert("No se pudo eliminar el comentario :CCC");
      }
    } finally {
        fetchMascota(id);
    }
  };

  useEffect(() => {

    const fetchMascota = async (id) => {
    try {
      const response = await api.get(`mascotas/${id}/`);
      if (response.status === 200) {
        setMascota(response.data);
      }
    } catch (error) {
      if (error.response?.status === 404){
        alert("Mascota no encontrada...")
      }else{
        alert("Error al cargar la mascota")
      }
    }
  };

    fetchMascota(id);
  }, [id]);

  const onclickEstado = async (id) => {
    const data = { estado: nuevoEstado };
    updateEstado(id, data);
  };

  return (
    <div className="contenedor-detalle">
      <div className="tarjeta-mascota">
        <div className="contenedor-imagen">
        <img src={mascota?.imagen} alt={"imagen mascota"} />
        </div>
        <p>
          <strong>Nombre: {mascota?.nombre}</strong>
        </p>
        <p>Descripcion: {mascota?.descripcion}</p>
        <p>
          Estado :{" "}
          {mascota?.estado === "en_adopcion" ? "En adopción" : mascota?.estado}
        </p>
        <div className="actualizar-estado">
          <label>Actualizar Estado:</label>
          <select
            value={nuevoEstado}
            onChange={(e) => setNuevoEstado(e.target.value)}
          >
            <option value="perdida">Perdida</option>
            <option value="encontrada">Encontrada</option>
            <option value="en_adopcion">En adopción</option>
            <option value="adoptada">Adoptada</option>
          </select>
          <button onClick={() => onclickEstado(mascota?.id)}>
            Actualizar estado
          </button>
        </div>

        <p>Tipo Animal: {mascota?.tipo_animal}</p>
        <p>raza: {mascota?.raza}</p>
        <p>edad: {mascota?.edad}</p>
        <p>Sexo: {mascota?.sexo}</p>
        <p>Tamaño: {mascota?.tamano}</p>
      </div>
      <div className="comentarios">
        <ComentariosList
          comentarios={mascota?.comentarios ?? []}
          idMascota={id}
          addComentario={addComentario}
          deleteComentario={deleteComentario}
        />
      </div>
    </div>
  );
}

export default ComentariosDetallesPage;
