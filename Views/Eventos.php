<?php
include "../Views/Plantillas/MenuHamburguesa.php"
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">

    <link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-vue@2.23.1/dist/bootstrap-vue.css">

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap-vue@2.23.1/dist/bootstrap-vue.min.js"></script>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-vue@2.22.0/dist/bootstrap-vue.min.css">

    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>


    <link type="text/css" rel="stylesheet" href="../Css/Style.css" />

    <title>Administrador eventos</title>
</head>

<body class="colorBody">

    <section class="seccionTabla">
        <div class="titulo">
            <h4>Eventos</h4>

        </div>

        <!-- Enlace para abrir el modal -->
        <div class="text-end mb-3">
            <a href="#" class="btn btn-primary rounded-pill" data-bs-toggle="modal" data-bs-target="#modalAgregarEvento">Agregar evento</a>
        </div>
        <div class="input-group">
            <input type="text" class="form-control border-end-0 border rounded-pill" id="datatable-search-input" oninput="searchData()" placeholder="Busca el evento" />

        </div>

        <div id="datatable">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Titulo</th>
                        <th>Tipo</th>
                        <th>Fecha</th>
                        <th>Acciones</th>

                    </tr>
                </thead>
                <tbody id="tablaEventos">
                </tbody>
            </table>
        </div>
        </div>
    </section>


    <!-- Modal para agregar nuevo evento -->
    <div class="modal fade" id="modalAgregarEvento" tabindex="-1" aria-labelledby="modalAgregarEventoLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalAgregarEventoLabel">Agregar evento</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- Formulario para agregar evento -->
                    <div class="mb-3">
                        <input type="hidden" class="form-control" id="inputId" required>
                    </div>

                    <div class="mb-3">
                        <label for="eventoTitulo" class="form-label">Titulo</label>
                        <textarea type="text" class="form-control" rows="3" id="inputTitulo" required> </textarea>
                    </div>

                    <div class="mb-3">
                        <label for="lblTipo" class="form-label">Tipo</label>
                        <select id="selectTipo" class="form-select">
                            <option value="0">Selecciona un tipo</option>
                            <option value="1">Nacimientos</option>
                            <option value="2">Muertes</option>
                            <option value="3">Acontecimientos</option>
                        </select>
                    </div>
                    <!--<div class="mb-3">
                        <label for="eventoTipo" class="form-label">Tipo de evento</label>
                        <select class="form-select" id="eventoTipo" required>
                            <option value="" disabled selected>Selecciona un tipo de evento</option>
                            <option value="Concierto">Nacimiento</option>
                            <option value="Conferencia">Muerte</option>
                            <option value="Reunión">Acontenciomientos</option>
                        </select>
                    </div>-->
                    <div class="mb-3">
                        <label for="eventoAnio" class="form-label">Año</label>
                        <input type="date" class="form-control" id="inputAnio" required>
                    </div>

                    <!--<div class="mb-3">
                        <label for="eventoDescripcion" class="form-label">Descripción</label>
                        <textarea class="form-control" id="eventoDescripcion" rows="3" required></textarea>
                    </div>-->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" id="btnAgregarEvento" id="btnAgregarEvento">Agregar</button>
                    <button type="button" class="btn btn-primary" id="btnActualizarEvento">Actualizar</button>

                </div>
            </div>
        </div>
    </div>

</body>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap-vue@2.23.1/dist/bootstrap-vue.min.js"></script>



<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="../Js/Eventos/Eventos.js"></script>

</html>