function validarFormulario() {
    let nombre = document.getElementById("contacto__nombre").value.trim();
    let apellido = document.getElementById("contacto__apellido").value.trim();
    let email = document.getElementById("email").value.trim();
    let asunto = document.getElementById("asunto").value.trim();
    let mensaje = document.getElementById("exampleFormControlTextarea1").value.trim();

    if (nombre === "" || apellido === "" || email === "" || asunto === "" || mensaje === "") {
      alert("Por favor, complete todos los campos del formulario.");
      return false;
    }

    for (let i = 0; i < nombre.length; i++) {
        let charCode = nombre.charCodeAt(i);
      if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
        alert("El campo 'nombre' solo puede contener caracteres alfabéticos y espacios.");
        return false;
      }
    }

    for (let i = 0; i < apellido.length; i++) {
        let charCode = apellido.charCodeAt(i);
        if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
          alert("El campo 'apellido' solo puede contener caracteres alfabéticos y espacios.");
          return false;
        }
      }

    let patron = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!(patron.test(email))) {
        alert("Ingrese un email válido")
        return false;
    }



    alert("Formulario enviado correctamente.");
    return true;
  }