$('#btnLogin').click(function (r) {
    r.preventDefault();

    var mailUser = document.getElementById("inputEmail").value;
    var passwordUser = document.getElementById("inputPassword").value;

    if (mailUser == "") {
        document.getElementById("inputEmail").focus();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El campo nombre no puede estar vacío.',
        });
    }
    else if (passwordUser == "") {
        document.getElementById("inputPassword").focus();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El campo contraseña no puede estar vacío.',
        });
    }
    else {
        var datos = {
            correo: mailUser,
            clave: passwordUser
        }

        $.ajax({
            type: 'POST',
            url: 'https://efemerides.elkin.click/api/usuario/login',

            data: datos,
            dataType: 'json',
            success: function (response) {

                localStorage.setItem("token", response.usuario.token);
                localStorage.setItem("nombre", response.usuario.nombre);

                if (response.rta) {
                    Swal.fire({
                        //title: 'Bienvenido',
                        text: response.message,
                        icon: 'success',
                        timer: 1000,
                        showConfirmButton: false,
                        iconColor: '#66CAF2'
                    }).then(() => {
                        window.location.href = "../Views/Eventos.php";
                    });
                }
            },
            error: function (xhr, status, error) {
                console.log("Error status:", status, " | Código:", xhr.status);

                try {
                    let response = JSON.parse(xhr.responseText);
                    Swal.fire('Error', response.message, 'error');
                    console.log("Respuesta error:", response);
                } catch (e) {

                    Swal.fire('Error', 'Hubo un problema al iniciar sesión.', 'error');
                }
            }
        });
    }
});




