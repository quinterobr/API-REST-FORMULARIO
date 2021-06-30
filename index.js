//Campos del formulario

const nombreInput = document.querySelector('#nombre');
const apellidoInput = document.querySelector('#apellido');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const tipoDocumento = document.querySelector('#tipoDocumento');
const documentoInput = document.querySelector('#documento');
const correoInput = document.querySelector('#correo');

//Formulario
const formulario = document.querySelector('#nueva-cita');



//Registrar eventos
eventListeners();

function eventListeners() {
    //Leer inputs
    nombreInput.addEventListener('input', datosCita);
    apellidoInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    tipoDocumento.addEventListener('input', datosCita);
    documentoInput.addEventListener('input', datosCita);
    correoInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);

}

//Classes
class UI {
    alterta(msn, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        tipo === 'error' ? divMensaje.classList.add('alert-danger') : divMensaje.classList.add('alert-success');
        divMensaje.textContent = msn;

        //Agregar alerta en el DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    limpiarHTML() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

const ui = new UI();

//Objeto principal con la informacion
const citaObj = {
    nombre: '',
    apellido: '',
    telefono: '',
    fecha: '',
    tipoDocumento: '',
    documento: '',
    correo: ''
};

//Agregar datos al objeto de cita
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

function nuevaCita(e) {
    e.preventDefault();

    //Extraer información
    const { nombre, apellido, telefono, fecha, tipoDocumento, documento, correo } = citaObj;

    if (nombre === '' || apellido == '' || telefono === '' || fecha === '' || tipoDocumento === '' || documento === '' || correo === '') {
        ui.alterta('Todos los campos son obligatorios', 'error');
        return;
    }
    const cita = {
        nombre,
        apellido,
        telefono,
        tipoDocumento,
        documento,
        correo
    };

    enviarInformacion(cita);

    formulario.reset();
    reiniciarObj();
}

function reiniciarObj() {
    citaObj.nombre = '';
    citaObj.apellido = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.tipoDocumento = '';
    citaObj.documento = '';
    citaObj.correo = '';
}

// function enviarInformacion(data) {

//     fetch('http://localhost:9000/users', {
//             method: 'POST',
//             body: JSON.stringify(data)
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//         })
//         .catch(err => {
//             console.log({ err });
//         })
// }