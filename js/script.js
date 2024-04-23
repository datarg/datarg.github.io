const input = document.querySelector("#textoBuscar")
const btn = document.querySelector("#boton")
const refrescar = document.querySelector("#refrescar")
let nombrePeli = ""

const llamada = () => {
    nombrePeli = input.value


    fetch(`https://online-movie-database.p.rapidapi.com/auto-complete?q=${nombrePeli}`, {

        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3c2b00260cmshc4004f9d92f6104p1be85bjsn014051503cef',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'//esto lo pide la api 
        }
    })

        .then(response => response.json())

        .then(data => {
            const list = data.d;
            list.map((item) => { //divide los datos que llegan desde la api en nuevos arrays, para poder manipularlos por separado

                const nombre = item.l //extrae nombre de peli
                const imagen = item.i.imageUrl //extrae la imagen de la peli
                const año = item.y //idem año
                const actores = item.s //idem actores y actrices
                const pelicula = `<div class="buschijo"><img src="${imagen}"class="foto"><h2>${nombre}</h2><h2>${año}</h2><h2>${actores}</h2></div>`//genera una lista con los datos encontrados
                busqueda.innerHTML += pelicula //inserta la lista en el div con el id busqueda

            })
        })
    input.value = ""
}

btn.addEventListener("click", llamada)
refrescar.addEventListener("click", function () { location.reload() })




// validador

function validarFormulario() {
    // Obtener los valores ingresados por el usuario y recortar
    // los posibles espacios en blanco al principio y al final.
    var nombre = document.getElementById("contacto__nombre").value.trim();
    var dni = document.getElementById("dni").value.trim();
    var direccion = document.getElementById("direccion").value.trim();

    // Verificar si algún campo está en blanco
    if (nombre === "" || dni === "" || direccion === "") {
      alert("Por favor, complete todos los campos del formulario.");
      return false;
    }

    // Verificar si el nombre contiene solo caracteres alfabéticos y espacios
    for (var i = 0; i < nombre.length; i++) {
      var charCode = nombre.charCodeAt(i);
      if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
        alert("El campo 'nombre' solo puede contener caracteres alfabéticos y espacios.");
        return false;
      }
    }

    // Verificar si el DNI contiene solo 8 dígitos numéricos
    if (dni.length !== 8) {
      alert("El campo 'dni' debe contener exactamente 8 dígitos numéricos.");
      return false;
    }
    for (var j = 0; j < dni.length; j++) {
      var digit = dni.charAt(j);
      if (digit < "0" || digit > "9") {
        alert("El campo 'dni' solo puede contener dígitos numéricos.");
        return false;
      }
    }

    // Si todas las validaciones son exitosas, enviar el formulario
    alert("Formulario enviado correctamente.");
    return true;
  }