<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>

    <title>Document</title>
</head>

<body>
    <nav class="navbar  fixed-top colorNavbar">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <a class="navbar-brand" href="#" id="titulo"></a>
            <button class="btnSalir rounded-pill navbar-toggler" onclick="cerrarSesion()" type="button">
                <i class="fa-solid fa-door-open"></i>
            </button>

            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header ">
                    <!--<h5 class="offcanvas-title" id="offcanvasNavbarLabel">Administracción</h5>-->
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body ">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="../Views/Eventos.php">
                                <i class="fa-regular fa-calendar me-2"></i> Administración de eventos
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="../Views/Usuarios.php">
                                <i class="fa-solid fa-user me-2"></i> Administración de usuarios
                            </a>
                        </li>
                    </ul>
                    <!--<form class="d-flex mt-3" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>-->
                </div>
            </div>
        </div>
    </nav>
</body>

<script src="../Js/Usuarios/Logout.js"></script>
<script src="../Js/Script.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>


<script>
  document.addEventListener("DOMContentLoaded", function () {
    
 let token = localStorage.getItem("token");
   
    if (!token) {
     
      window.location.href = "../Views/Login.php";
    }
  });
</script>
</html>