const productosComidas = document.querySelector(".div-cards");
const carrito = document.querySelector("#carrito");
const botonComprar = document.querySelector(".button-comprar");
const totalPrecio = document.querySelector(".precio-total");


let carritoData = [];


function verProductos(array) {
    productosComidas.innerHTML = array.map(producto => `
        <div class="carta text-center">
            <img class="img-card" src="${producto.img}" alt="">
            <h3 class="titulo-card">${producto.nombre}</h3>
            <p class="precio-card">${producto.precio}</p>
            <button type="button" class="btn-card btn btn-secondary">Agregar al carrito</button>
        </div>
    `).join("");


    document.querySelectorAll(".btn-card").forEach(btn => {
        btn.addEventListener("click", clickearBoton);
    });
}


function clickearBoton(event) {
    const carta = event.target.closest(".carta");
    const titulo = carta.querySelector(".titulo-card").textContent;
    const precio = carta.querySelector(".precio-card").textContent;
    const img = carta.querySelector(".img-card").src;

    Toastify({
        text: `Se agregó ${titulo} al carrito.`,
        close: true,
        duration: 3000,
        position: "left"
    }).showToast();

    agregarAlCarrito(titulo, precio, img);
}

function agregarAlCarrito(titulo, precio, img, cantidadInicial = 1) {
    const productoExistente = carritoData.find(item => item.titulo === titulo);
    if (productoExistente) {
        productoExistente.cantidad += cantidadInicial;
    } else {
        carritoData.push({ titulo, precio, img, cantidad: cantidadInicial });
    }

    renderizarCarrito();
    guardarCarritoEnLocalStorage();
}


function renderizarCarrito() {
    carrito.innerHTML = "";
    carritoData.forEach(producto => {
        const cartaCarrito = document.createElement("div");
        cartaCarrito.classList.add("row", "cartas-carrito");

        cartaCarrito.innerHTML = `
            <div class="columna row col-8">
                <img src="${producto.img}" class="imgCarta w-25 h-50">
                <h4 class="tituloCarta w-50 h-25 fs-5">${producto.titulo}</h4>
            </div>
            <div class="columna col-2">
                <p class="precioCarta">${producto.precio}</p>
            </div>
            <div class="columna col-2">
                <input class="cantidadDeElementos w-50" type="number" value="${producto.cantidad}" min="1">
                <button type="button" class="btnBorrarCarrito btn btn-danger">X</button>
            </div>
        `;

        cartaCarrito.querySelector(".btnBorrarCarrito").addEventListener("click", () => {
            carritoData = carritoData.filter(item => item.titulo !== producto.titulo);
            renderizarCarrito();
            guardarCarritoEnLocalStorage();
        });

        cartaCarrito.querySelector(".cantidadDeElementos").addEventListener("change", (e) => {
            let nuevaCantidad = parseInt(e.target.value);
            if (nuevaCantidad <= 0 || isNaN(nuevaCantidad)) nuevaCantidad = 1;
            producto.cantidad = nuevaCantidad;
            guardarCarritoEnLocalStorage();
            actualizarTotal();
        });

        carrito.appendChild(cartaCarrito);
    });

    actualizarTotal();
}

function actualizarTotal() {
    let total = 0;
    carritoData.forEach(producto => {
        const precioNum = parseFloat(producto.precio.replace("$", ""));
        total += precioNum * producto.cantidad;
    });
    totalPrecio.innerText = `$${total.toFixed(2)}`;
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carritoData));
}

function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carritoData = JSON.parse(carritoGuardado);
        renderizarCarrito();
    }
}

botonComprar.addEventListener("click", () => {
    carritoData = [];
    carrito.innerHTML = "";
    actualizarTotal();
    localStorage.removeItem("carrito");
    Toastify({
        text: "✅ Compra realizada. ¡Gracias!",
        duration: 3000,
        position: "left"
    }).showToast();
});

verProductos(productos); 
cargarCarritoDesdeLocalStorage();





