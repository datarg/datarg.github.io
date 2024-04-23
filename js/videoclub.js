const URL = "http://54.207.156.175/"
const botonlistar = document.querySelector("#botonlistar")
const botonbuscar = document.querySelector("#botonbuscar")
const buscar = document.querySelector("#textoBuscar")

function listar() {
    document.getElementById('formulario').reset();
    contpelis.innerHTML = ""
    fetch(URL + "listar")
        .then(response => response.json())
        .then(pelis => {
            const list_l = pelis;
            list_l.map((item) => { //divide los datos que llegan desde la api en nuevos arrays, para poder manipularlos por separado
                const id = item.IdPeliculas
                const nombre = item.Nombre
                const genero = item.Genero
                const año = item.anio
                const stock = item.Stock
                const pelicula = `<tr><td>${id}</td><td>${nombre}</td><td>${genero}</td><td>${año}</td><td>${stock}</td><td><button id="${'editar' + String(id)}" onclick="rellenar(${id})">Editar</button></td><td><button id="${'eliminar' + String(id)}" onclick="eliminar(${id})">Eliminar</button></td></tr>`//genera una lista con los datos encontrados
                contpelis.innerHTML += pelicula //inserta la lista en la trabla con el id busqueda
            })
        })
}


function consultar() {
    document.getElementById('formulario').reset();
    contpelis.innerHTML = ""
    nombrePeli = buscar.value
    fetch(URL + "consultar")
        .then(response => response.json())
        .then(pelis => {
            const list_c = pelis;
            list_c.forEach(element => {
                // console.log(element)
                if (element.Nombre.trim() == nombrePeli) {
                    const pelicula = `<tr><td>${element.IdPeliculas}</td><td>${element.Nombre}</td><td>${element.Genero}</td><td>${element.anio}</td><td>${element.Stock}</td><td><button id="${'editar' + String(element.IdPeliculas)}" onclick="rellenar(${element.IdPeliculas})">Editar</button></td><td><button id="${'eliminar' + String(element.IdPeliculas)}" onclick="eliminar(${element.IdPeliculas})">Eliminar</button></td></tr>`//genera una lista con los datos encontrados
                    contpelis.innerHTML += pelicula //inserta la lista en la trabla con el id busqueda
                }
            }); 
        })
}


//------------------------------------------------------------------------


document.getElementById('formulario').addEventListener('submit', function(event) {event.preventDefault();

    const peliculasumar = {
    IdPeliculas: document.querySelector("#agregarid").value,
    Nombre: document.querySelector("#agregarnombre").value,
    Genero: document.querySelector("#agregargenero").value,
    anio: parseInt(document.querySelector("#agregaraño").value),
    Stock: parseInt(document.querySelector("#agregarstock").value)
    };


    fetch(URL + "agregar", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Ajusta el tipo de contenido según tus necesidades
        },
        body: JSON.stringify(peliculasumar) // Ajusta 'data' con los datos que deseas enviar en la solicitud
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            alert('Pelicula agregada correctamente.');
            listar();
            // console.log(data)
            // Manejar la respuesta de la solicitud POST aquí
        })
        .catch( function (error) {
            alert('Error al agregar la pelicula.');
            // Manejar cualquier error que ocurra durante la solicitud
        });
console.log(peliculasumar)
document.getElementById('formulario').reset();
});


//-------------------------------------------------------------


function rellenar(id) {
    fetch(URL + "editar/" + id)
        .then(response => response.json())
        .then(pelis => {
            document.querySelector("#agregarid").value = pelis[0]
            document.querySelector("#agregarnombre").value = pelis[1]
            document.querySelector("#agregargenero").value = pelis[2]
            document.querySelector("#agregaraño").value = pelis[3]
            document.querySelector("#agregarstock").value = pelis[4]
            document.querySelector("#agregar_o_modificar_pelicula").setAttribute("type", "button")
            document.querySelector("#agregar_o_modificar_pelicula").textContent = "Modificar"
        })

    let boton_agregar_o_modificar_pelicula = document.querySelector("#agregar_o_modificar_pelicula")


    function modificar() {
        document.getElementById('formulario')

        var pelicula_modificar = {
            IdPeliculas: document.querySelector("#agregarid").value,
            Nombre: document.querySelector("#agregarnombre").value,
            Genero: document.querySelector("#agregargenero").value,
            anio: parseInt(document.querySelector("#agregaraño").value),
            Stock: parseInt(document.querySelector("#agregarstock").value)
        };


        fetch(URL + "modificar", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pelicula_modificar)
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                alert("Pelicula Modificada Correctamente")
                listar()
            })
            .catch( function (error) {
                alert('Error al agregar la pelicula.');
                // Manejar cualquier error que ocurra durante la solicitud
            });
    }

    boton_agregar_o_modificar_pelicula.addEventListener("click", modificar);

    

    document.getElementById('formulario').reset();
}


//------------------------ELIMINAR-------------------------------------

function eliminar(id) {
    console.log(id)
    fetch(URL + "eliminar/" + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify(id)
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            alert("Pelicula Eliminada Correctamente")
            listar()
        })
        .catch( function (error) {
            alert('Error al eliminar la pelicula.');
            // Manejar cualquier error que ocurra durante la solicitud
        });
}









botonlistar.addEventListener("click", listar);
botonbuscar.addEventListener("click", consultar);





