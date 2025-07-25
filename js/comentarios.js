const container = document.querySelector(".contenedor");

fetch("https://jsonplaceholder.typicode.com/comments?postId=1")
.then(respuesta => respuesta.json())
.then(data => mostrarComentarios(data))
.catch(error => console.log(error))


const mostrarComentarios = (data) => {
    console.log(data)
    let comentario = ""
    for(let i = 0; i < data.length; i++) {
        comentario += `
        <div class="cada-comentario">
            <h3 class="titulo-comentario">${data[i].email}</h3>
            <p class="parrafo-comentario">${data[i].body}</p>
        </div>
        `
    }
    container.innerHTML = comentario
}