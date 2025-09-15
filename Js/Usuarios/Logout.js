//Cerrar sesión
function cerrarSesion() {

    Swal.fire({
        title: "¿Estás seguro?",
        text: "Tu sesión se cerrará",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, salir",
        cancelButtonText: "Cancelar",
        iconColor: '#66CAF2',
        confirmButtonColor: '#66CAF2',
    cancelButtonColor: '#66CAF2'
    }).then((result) => {
        if (result.isConfirmed) {

            localStorage.removeItem("token");

            window.location.href = "../Views/Login.php";
        }
    });
}