new Vue({
  el: '#calendario',
  data() {
    return {
      value: '',
      eventos: [],
      datos: []
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