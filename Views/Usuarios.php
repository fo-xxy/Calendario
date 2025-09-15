<?php
include "../Views/Plantillas/MenuHamburguesa.php"
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link type="text/css" rel="stylesheet" href="../Css/Style.css" />

    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <title>Document</title>
</head>

<body>
    <section class="seccionTabla">
        <div class="titulo">
            <h4>Usuarios</h4>

        </div>

        <!-- Enlace para abrir el modal -->
        <div class="text-end mb-3">
            <a href="#" class="btn btn-primary rounded-pill" data-bs-toggle="modal" data-bs-target="#modalAgregarUsuario">Agregar usuario</a>
            <a href="#" class="btn btn-primary rounded-pill" data-bs-toggle="modal" data-bs-target="#modalCambiarContrasena">Cambiar contraseña</a>
        </div>
        
        <div class="input-group">
            <input type="text" class="form-control border-end-0 border rounded-pill" id="datatable-search-input" oninput="searchData()" placeholder="Busca el evento" />
        </div>

        <div id="datatable">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Id rol</th>
                        <th>Acciones</th>

                    </tr>
                </thead>
                <tbody id="tablaUsuarios">
                </tbody>
            </table>
        </div>
        </div>
    </section>


    <!-- Modal para agregar nuevo evento -->
    <div class="modal fade" id="modalAgregarUsuario" tabindex="-1" aria-labelledby="modalAgregarEventoLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalAgregarUsuarioLabel">Agregar un nuevo usuario</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <input type="hidden" id="inputIdUsuario">

                    <div class="mb-3">
                        <label for="lblNombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="inputNombre" required>
                    </div>
                    <div class="mb-3">
                        <label for="lblApellido" class="form-label">Apellido</label>
                        <input type="text" class="form-control" id="inputApellido" required>
                    </div>
                    <div class="mb-3">
                        <label for="lblCorreo" class="form-label">Correo</label>
                        <input type="text" class="form-control" id="inputCorreo" required>
                    </div>
                    <div class="mb-3" id="divContrasena">
                        <label for="lblClave" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="inputContrasena" required>
                    </div>
                    <div class="mb-3">
                        <label for="lblCorreo" class="form-label">Rol</label>
                        <select id="selectRoles" class="form-select">
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" id="btnAgregar">Agregar</button>
                    <button type="button" class="btn btn-primary" id="btnActualizar">Actualizar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalCambiarContrasena" tabindex="-1" aria-labelledby="modalCambiarContrasena" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalCambiarContrasena">Cambiar contraseña</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
        
                    <div class="mb-3">
                        <label for="lblUsuario" class="form-label">Usuario</label>
                        <select id="selectUsuarios" class="form-select">
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="lblContrasena" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="inputContrasenaAc" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>

                    <button type="button" class="btn btn-primary" id="btnActualizarContrasena">Actualizar</button>
                </div>
            </div>
        </div>
    </div>
</body>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script src="../Js/Usuarios/Usuarios.js"></script>

</html>