const container = document.querySelector(".contenedor");

fetch("https://jsonplaceholder.typicode.com/comments?postId=1")
  .then(res => res.json())
  .then(mostrarComentarios)
  .catch(error => console.error("Error al cargar los comentarios:", error));

function mostrarComentarios(comentarios) {
  container.innerHTML = comentarios.map(comentario => `
    <div class="cada-comentario">
      <h3 class="titulo-comentario">${comentario.email}</h3>
      <p class="parrafo-comentario">${comentario.body}</p>
    </div>
  `).join("");
}
