import { useState } from "react";

function ComentariosList({ comentarios, idMascota, addComentario, actualizar, deleteComentario }) {
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [autor, setautor] = useState("");

  const onClickComentario = async () => {
    const nuevocomentario = {
      mascota: idMascota,
      autor: autor,
      contenido: nuevoComentario,
    };

    await addComentario(nuevocomentario);
    await actualizar(idMascota)

    setNuevoComentario("")
    setautor("")
  };

  return (
    <>
      <div>
        <textarea
          placeholder="Escriba un comentario"
          value={nuevoComentario}
          onChange={(e) => setNuevoComentario(e.target.value)}
          type="text"
        />
        <textarea
          placeholder="autor"
          value={autor}
          onChange={(e) => setautor(e.target.value)}
          type="text"
        />
        <button onClick={() => onClickComentario()}>Subir Comentario</button>
      </div>
      <h2>Comentarios</h2>
      {comentarios.length === 0 ? (
        <p>No hay comentarios</p>
      ) : (
        comentarios.map((c) => (
          <div key={c.id}>
            <p>
              <strong>Autor: {c.autor}</strong>
            </p>
            <p>{c.contenido}</p>
            <button onClick={() => deleteComentario(c.id)}>Eliminar</button>
          </div>
        ))
      )}
    </>
  );
}

export default ComentariosList;
