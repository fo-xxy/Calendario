document.addEventListener("DOMContentLoaded", function () {
    const titulo = document.getElementById("titulo");
    const path = window.location.pathname; // ejemplo: /Views/Eventos.php

    if (path.includes("Eventos.php")) {
        titulo.textContent = "Eventos";
    }
    
    if (path.includes("Usuarios.php")) {
        titulo.textContent = "Usuarios";
    } 
});
