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
      console.log(response.data);

      if (response.status === 200) {
        setMascota(response.data);
      }
    } catch (error) {}
  };

  const updateEstado = async (id, data) => {
    try {
      const response = await api.patch(`mascotas/${id}/`, data);
      console.log(response);
    } catch (error) {
      console.error(error.response);
    } finally {
      fetchMascota(id);
    }
  };

  const addComentario = async (data) => {
    try {
      const response = await api.post("comentarios/", data);
      console.log(response);
    } catch (error) {
      console.error(error.response);
    }
  };

  const deleteComentario = async (comentarioId) => {
    try {
      await api.delete(`comentarios/${comentarioId}/`);
      alert("Comentario eliminado :p");
      fetchMascota(id);
    } catch (error) {
      console.error(error.response?.data);
      alert("No se pudo eliminar el comentario :CCC");
    }
  };

  useEffect(() => {
    fetchMascota(id);
  }, []);

  const onclickEstado = async (id) => {
    const data = { estado: nuevoEstado };
    console.log(data);
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
          actualizar={fetchMascota}
          deleteComentario={deleteComentario}
        />
      </div>
    </div>
  );
}

export default ComentariosDetallesPage;
