/*new Vue({
  el: '#calendario',
  data() {
    return {
      value: '',
      eventos: [],
      datos: [],
          context: {}, // Necesario para slot nav

    };
  },
  created() {
    fetch('https://efemerides.elkin.click/api/efemeride/consultar')
      .then(response => response.json())
      .then(data => {
        this.datos = data.Efemeride;

        console.log(this.datos);
      })
      .catch(error => console.error('Error al cargar el JSON:', error));
  },
  computed: {
    // Esta propiedad se encarga de formatear la fecha para la visualización
    formattedValue() {
      if (!this.value) return '';

      const parts = this.value.split('-');
      const date = new Date(parts[0], parts[1] - 1, parts[2]);

      // Verificar que la fecha sea válida
      if (isNaN(date.getTime())) return '';

      const dia = date.getDate().toString().padStart(2, '0');
      const mes = (date.getMonth() + 1).toString().padStart(2, '0');
      const anio = date.getFullYear();

      return `${dia}/${mes}/${anio}`;
    }
  },
  methods: {
    monthName(monthIndex) {
    const date = new Date(2023, monthIndex, 1); // Año no importa
    return date.toLocaleString('es-ES', { month: 'long' });
  },
    onDateSelected() {
      const selectedDate = this.value;

      const eventosParaFecha = this.datos.filter(evento => {
        const fechaEvento = String(evento.ano).split(" ")[0];
        return fechaEvento === selectedDate;
      });

      this.eventos = eventosParaFecha;

      console.log('Fecha seleccionada:', selectedDate);
      console.log('Eventos encontrados:', eventosParaFecha);
    }

    
  }
});*/



new Vue({
  el: "#app",
  data() {
    const today = new Date();
    return {
      currentMonth: today.getMonth(),
      currentYear: today.getFullYear(),
      selectedDate: null,
      datos: [], // recuerda inicializar aquí
    };
  },
  created() {
    fetch('https://efemerides.elkin.click/api/efemeride/consultar')
      .then(response => response.json())
      .then(data => {
        this.datos = data.Efemeride;
        console.log(this.datos);
      })
      .catch(error => console.error('Error al cargar el JSON:', error));
  },
  computed: {
    monthName() {
      const date = new Date(this.currentYear, this.currentMonth);
      return date.toLocaleString('es-ES', { month: 'long' });
    },
    daysInMonth() {
      const days = [];
      const year = this.currentYear;
      const month = this.currentMonth;

      const daysCount = new Date(year, month + 1, 0).getDate();

      for (let i = 1; i <= daysCount; i++) {
        const date = new Date(year, month, i);
        const dataDate = `${year}${(month + 1).toString().padStart(2, '0')}${i
          .toString()
          .padStart(2, '0')}`;
        days.push({
          day: i,
          date: date.toISOString().substr(0, 10),
          dataDate,
        });
      }

      return days;
    },
    eventsForSelectedDate() {
      if (!this.selectedDate) return [];
      return this.datos.filter(evento => {
        const fechaEvento = String(evento.ano).split(" ")[0];
        return fechaEvento === this.selectedDate;
      });
    }
  },
  methods: {
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },
    selectDate(date) {
      this.selectedDate = date;
      console.log("Fecha seleccionada:", date);
      console.log(this.datos);

      const eventosParaFecha = this.datos.filter(evento => {
        const fechaEvento = String(evento.ano).split(" ")[0];
        return fechaEvento === this.selectedDate;
      });

      this.eventos = eventosParaFecha;

      console.log('Fecha seleccionada:', date);
      console.log('Eventos encontrados:', eventosParaFecha);
    },
    formatDate(dateStr) {
      if (!dateStr) return '';

      const parts = dateStr.split('-');
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; 
      const day = parseInt(parts[2], 10);

      const date = new Date(year, month, day);

      return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    },
    onDateSelected() {
      const selectedDate = this.value;

      const eventosParaFecha = this.datos.filter(evento => {
        const fechaEvento = String(evento.ano).split(" ")[0];
        return fechaEvento === selectedDate;
      });

      this.eventos = eventosParaFecha;

      console.log('Fecha seleccionada:', selectedDate);
      console.log('Eventos encontrados:', eventosParaFecha);
    }
  }
});