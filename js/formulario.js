const formulario = document.querySelector("#formulario-registro");
const inputNombre = document.querySelector("#campo-nombre");
const inputApellido = document.querySelector("#campo-apellido");
const inputEmail = document.querySelector("#campo-email");
const inputDireccion = document.querySelector("#campo-direccion");

const confirmacionRegistro = () => {
    if (
        inputNombre.value.trim() !== "" &&
        inputApellido.value.trim() !== "" &&
        inputEmail.value.trim() !== "" &&
        inputDireccion.value.trim() !== ""
    ) {
        Toastify({
            text: `Gracias ${inputNombre.value} ${inputApellido.value} por tu compra. En breve estaremos enviando tu pedido a ${inputDireccion.value}. Te contactaremos al email: ${inputEmail.value}.`,
            close: true,
            duration: 4000,
            position: "left",
        }).showToast();
        return true;
    } else {
        Toastify({
            text: "¡¡ Por favor completar todos los campos !!",
            close: true,
            duration: 3000,
            position: "left",
        }).showToast();
        return false;
    }
};

formulario.onsubmit = (event) => {
    event.preventDefault();

    if (confirmacionRegistro()) {
        formulario.reset();

        setTimeout(() => {
            document.body.classList.add("fade-out");

            setTimeout(() => {
                window.location.href = "index.html";
            }, 800); 
        }, 4000);
    }
};
