let articulo = document.querySelector('#lista');
let alerta = document.querySelector('.alerta');
let listaCompra = [];
let lista = document.querySelector('#compra');

let borrarElementos = document.querySelector('.borrarElementos');
let botonAñadir = document.querySelector('.botonAñadir');
let botonSave = document.querySelector('.botonSave')

//El boton Guardar solo me interesa cuando 
botonSave.style.display = 'none';

addEventListener("DOMContentLoaded", () =>{ 

    //Cuando se haga click en el boton agregará un artículo a la lista.
    botonAñadir.addEventListener('click', añadir, true);

    //Al hacer click borrara todos los articulos.
    borrarElementos.addEventListener('click', borrarTodo);

})


function añadir() {
    let valor = articulo.value;
    botonAñadir.innerHTML = "Añadir";

    if (valor == "") {
        alerta.innerHTML = "Por favor añada algún artículo";

        setTimeout( () => {
            alerta.textContent = "";
        }, 1500);
    } else {
        listaCompra.push(valor.trim());
        articulo.value = '';
        agregar();
    }
}

function agregar() {
    var newArticulo = '';

    if(listaCompra.length > 0) {
        for(let i = 0; i < listaCompra.length; i++) {
            newArticulo += "<li>" + listaCompra[i] + "<div><button class='botonEditar' onclick='editar(" + i + ")'><span class='iconoE'><i class='fas fa-edit'></i></span></button> <button class='botonBorrar' onclick='borrar(" + i + ")'> <span class='iconoB'><i class='fas fa-trash-alt'></i></span> </button></div></li>";
        }
    }

    lista.innerHTML = newArticulo;
    borrarElementos.textContent = "Borrar Lista"

}

function editar(e) {
    articulo.value = listaCompra[e];
    articulo.focus();
    botonSave.style.display = 'inline';
    botonAñadir.style.display = 'none';


    botonSave.addEventListener('click', hola);

    function hola() {
        listaCompra[e] = articulo.value;
        botonSave.style.display = 'none';
        botonAñadir.style.display = 'inline';
        articulo.value = "";
        alerta.textContent = "Cambio Guardado";

        /* Al llamar el evento por segunda vez me toma el valor anterior y el actual. 
        Al hacer un remove limpio el addeventlistener */
        botonSave.removeEventListener('click', hola);
        agregar();

        setTimeout( () => {
        
            alerta.textContent = "";
        }, 1000);
    }
    
}


function borrar(e) {
    listaCompra.splice(e, 1);
    agregar();
    if (listaCompra.length == 0) {
        borrarElementos.textContent = "";
    }

    alerta.textContent = "Eliminado";

    setTimeout( () => {
        
        alerta.textContent = "";
    }, 1000);
}

function borrarTodo() {
    while (lista.firstChild) {
        lista.removeChild(lista.lastChild);
    }

    listaCompra.length = 0;

    alerta.textContent = "Has Vaciado La Lista";

    borrarElementos.textContent = "";
    
    setTimeout( () => {
        
        alerta.textContent = "";
    }, 1000);
}
