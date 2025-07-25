let productosComidas = document.querySelector(".div-cards")

function verProductos(array) {
    array.forEach(elemento => {
        productosComidas.innerHTML += `
        <div class="carta text-center">
            <img class="img-card" src=${elemento.img} alt="">
            <h3 class="titulo-card">${elemento.nombre}</h3>
            <p class="precio-card">${elemento.precio}</p>
            <button type="button" class="btn-card btn btn-secondary">Agregar al carrito</button>
        </div>
        `
    });
}

verProductos(productos);








const carrito = document.querySelector("#carrito")

const botonDeAgregar = document.querySelectorAll(".btn-card");
botonDeAgregar.forEach((btnDeAgregar) => {
    btnDeAgregar.addEventListener("click", clickearBoton )
});

const botonComprar = document.querySelector(".button-comprar");
botonComprar.addEventListener("click", botonDeComprar);

function clickearBoton (event) {
    const boton = event.target;
    const todaLaCarta = boton.closest(".carta");

    const tituloDeCarta = todaLaCarta.querySelector(".titulo-card").textContent;
    const precioDeCarta = todaLaCarta.querySelector(".precio-card").textContent;
    const imgDeCarta = todaLaCarta.querySelector(".img-card").src;
    
    Toastify({
        text: `Se agregó ${tituloDeCarta} al carrito.`,
        close: true,
        duration: 3000,
        position: "left"
    }).showToast()
    
    elementosDeLaCarta(tituloDeCarta, precioDeCarta, imgDeCarta);
}

function elementosDeLaCarta(tituloDeCarta, precioDeCarta, imgDeCarta) {
    const tituloDeLasCartas = carrito.getElementsByClassName("tituloCarta");
    for (let i = 0; i < tituloDeLasCartas.length; i++) {
        if (tituloDeLasCartas[i].innerText === tituloDeCarta) {
            let cantidadElementos = tituloDeLasCartas[i].parentElement.parentElement.parentElement.querySelector(".cantidadDeElementos");
            cantidadElementos.value++;
            actualizarTotal()
            return;
        }
    }



    const cartaEnCarrito = document.createElement("div");
    const contenidoDeCarrito = `
    <div class="row cartas-carrito">
        <div class="columna row col-8">
                <img src=${imgDeCarta} class="imgCarta w-25 h-50">
                <h4 class="tituloCarta w-50 h-25 fs-5">${tituloDeCarta}</h4>
        </div>
        <div class="columna col-2">
            <p class="precioCarta">${precioDeCarta}</p>
        </div>
        <div class="columna col-2">
            <input class="cantidadDeElementos w-50" type="number" value="1">
            <button type="button" class="btnBorrarCarrito btn btn-danger">X</button>
        </div>
    </div>
    `;

    cartaEnCarrito.innerHTML = contenidoDeCarrito
    carrito.append(cartaEnCarrito);

    cartaEnCarrito.querySelector(".btnBorrarCarrito").addEventListener("click", borrarCartaDeCarrito);

    cartaEnCarrito.querySelector(".cantidadDeElementos").addEventListener("change", cambiarLaCantidad);

    actualizarTotal();
}

function actualizarTotal() {
    let total = 0;
    const totalPrecio = document.querySelector(".precio-total");
    const elementosDeCarta = document.querySelectorAll(".cartas-carrito")

    elementosDeCarta.forEach((elementoCarta) => {
        const precioDeLaCarta = elementoCarta.querySelector(".precioCarta");
        const elPrecio = Number(precioDeLaCarta.textContent.replace("$", ""));
        const cantidadDeCartas = elementoCarta.querySelector(".cantidadDeElementos");
        const cantidadTotalCartas = Number(cantidadDeCartas.value);

        total = total + elPrecio * cantidadTotalCartas;
    })

    totalPrecio.innerHTML = `$${total.toFixed(2)}`;
}

function borrarCartaDeCarrito (event) {
    const botonBorrar = event.target;
    botonBorrar.closest(".cartas-carrito").remove();
    actualizarTotal()
}

function cambiarLaCantidad (event) {
    const inputCantidad = event.target;
    inputCantidad.value < 0 ? inputCantidad.value = 1 : null;
    actualizarTotal();
}

function botonDeComprar() {
    carrito.innerHTML = ""
    actualizarTotal();
}





