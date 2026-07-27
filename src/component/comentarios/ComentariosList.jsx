function ComentariosList({ comentarios }) {
  console.log(comentarios)
  return (
    <>
      {comentarios.length === 0 ? (
        <p>No hay comentarios</p>
      ) : (
        comentarios.map((c) => (
          <div key={c.id}>
            <h2>Comentarios</h2>
            <p><strong>{c.autor}</strong></p>
            <p>{c.contenido}</p>
          </div>
        ))
      )}
    </>
  );
}

export default ComentariosList;
