const formulario = document.querySelector("#formulario-registro");
const inputNombre = document.querySelector("#campo-nombre");
const inputApellido = document.querySelector("#campo-apellido");
const inputEmail = document.querySelector("#campo-email");
const inputDireccion = document.querySelector("#campo-direccion");
const submit = document.querySelector("#submit");
const registrado = document.querySelector("#registrado");



let clientes = []

class ClienteNuevo {
    constructor(nombre, apellido, email, direccion){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.direccion = direccion;
    }
}

const agregarClienteNuevo = (array, inputNombre, inputApellido, inputEmail, inputDireccion) => {
    array.push(inputNombre, inputApellido, inputEmail, inputDireccion)
}

const clienteJSON = (clave, valor) => {
    const arrayJSON = JSON.stringify(valor)
    localStorage.setItem(clave, arrayJSON)
}

const parseCliente = (clave) => {
    const arrayParse = localStorage.getItem("clientes") || "[]"
    const parsearArray = JSON.parse(arrayParse)
    return parsearArray
}

function confirmacionRegistro() {
    if(inputNombre.value !== "" && inputApellido !== "" && inputEmail !== "" && inputDireccion !== "") {
        
        Toastify({
            text: `Gracias ${inputNombre.value} por tu compra. En breve estaremos enviando tu pedido.`,
            close: true,
            duration: 3000,
            position: "left"
        }).showToast()
    }
    else {
        Toastify({
            text: `¡¡ Por favor completar todos los campos !!`,
            close: true,
            duration: 3000,
            position: "left"
        }).showToast()
    }
}

formulario.onsubmit = (event) => {
    event.preventDefault();
    agregarClienteNuevo(clientes, inputNombre.value, inputApellido.value, inputEmail.value, inputDireccion.value);
    confirmacionRegistro();
    formulario.reset();
    clienteJSON("clientes", clientes);
}