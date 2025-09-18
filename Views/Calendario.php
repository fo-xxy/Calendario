<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Calendario</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">

  <link type="text/css" rel="stylesheet" href="../Css/Style.css" />

</head>

<body>
  <div id="app" class="container mt-5">
    <div class="row justify-content-center align-items-start flex-md-row flex-column" style="min-height: 80vh;">

      <!-- Calendario -->
      <div class="col-md-4 d-flex justify-content-center mb-4 mb-md-0">
        <div class="datepicker-container">
          <div class="datepicker-top">
            <span class="nav-arrow" @click="prevMonth" type="button">
              <i class="fa-solid fa-chevron-left" ></i></span>
                <p class="datepicker-title">{{ monthName }}</p>
                <span class="nav-arrow" @click="nextMonth" type="button"><i class="fa-solid fa-chevron-right"></i></span>
          </div>

          <div class="datepicker-days">
            <div class="datepicker-cells">
              <span
                v-for="day in daysInMonth"
                :key="day.date"
                class="datepicker-cell"
                :class="{ selected: selectedDate === day.date }"
                :data-date="day.dataDate"
                @click="selectDate(day.date)">
                {{ day.day }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de eventos -->
      <div class="col-md-4 d-flex justify-content-center">
        <div v-if="selectedDate" class="event-list w-100">
          <h5 class="mb-4">{{ formatDate(selectedDate) }}</h5>
          <div class="event-scroll">
            <ul class="listaEventos">
              <li
                v-for="event in eventsForSelectedDate"
                :key="event.id"
                class="mb-3">
                <strong>{{ event.evento }}</strong> {{ event.titulo }}
              </li>
              <li v-if="eventsForSelectedDate.length === 0" class="text-muted">
                No hay eventos para esta fecha.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr class="calendar-divider mt-4" />
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap-vue@2.21.2/dist/bootstrap-vue.min.js"></script>

  <script src="../Js/Calendario.js"></script>
</body>

</html>