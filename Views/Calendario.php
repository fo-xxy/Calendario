<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Calendario</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" />
    <link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-vue@2.23.1/dist/bootstrap-vue.min.css" />

    <link type="text/css" rel="stylesheet" href="../Css/Style.css" />

</head>

<body>
    <div id="calendario" class="container mt-5">
  <div class="row">
    <div class="col-12 col-md-3">
      <b-calendar
        v-model="value"
        locale="es"
        label-help=""
        label-no-date-selected="Fecha no seleccionada."
        @input="onDateSelected">
      </b-calendar>
    </div>
    <div class="col-md-4 align-items-left">
      <div v-if="value">
        <br>
        <h5>Eventos para {{  formattedValue  }}</h5>
        <ul>
          <li v-for="evento in eventos" :key="evento.id">
            <img src="../Images/Iconos/evento.png" alt="Evento">
            <strong>{{ evento.evento }}</strong> {{ evento.titulo }}
          </li>
        </ul>
      </div>
    </div>
  </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-vue@2.23.1/dist/bootstrap-vue.min.js"></script>

    <script src="../Js/Calendario.js"></script>
</body>

</html>