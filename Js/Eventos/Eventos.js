function searchData() {
  const query = document
    .getElementById("datatable-search-input")
    .value.toLowerCase();

  const table = document.getElementById("tablaEventos");
  const rows = table.getElementsByTagName("tr");


  for (let i = 1; i < rows.length; i++) {
    const rowText = rows[i].textContent.toLowerCase();

    if (rowText.includes(query)) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}


//Cargar eventos
function CargarEventos() {

  const tablaEventos = $("#tablaEventos");

  let token = localStorage.getItem("token");

  $.ajax({
    url: "https://efemerides.elkin.click/api/efemeride/consultar",
    method: "GET",
    data: "",
    dataType: "json",
    headers: {
      "Authorization": "Bearer " + token
    },
    success: function (data) {
      if (data.rta) {

        tablaEventos.empty();

        data.Efemeride.sort((a, b) => a.id - b.id);



        console.log(data.Efemeride);
        data.Efemeride.forEach((evento) => {
          const rowHTML = `
            <tr>
            <td>${evento.id}</td>
              <td>${evento.titulo}</td>
              <td>${evento.tipo === 1
              ? "Nacimientos"
              : evento.tipo === 2
                ? "Muertes"
                : evento.tipo === 3
                  ? "Acontecimientos"
                  : "Sin definir"
            }</td>
                <td>${evento.ano}</td>
                <td>
                    <button class="transparent-btn btn-edit" onclick="openEditModalEvento(this)">
                                <i class="fa-solid fa-pen"></i>
                            </button>

                <button class="transparent-btn" onclick="eliminarEvento(${evento.id})">
                                <i class="fa-solid fa-trash-alt"></i>
                            </button>
                </td>
            </tr>
        `;
          tablaEventos.append(rowHTML);
        });

      } else {
        container.html('<p>No hay eventos disponibles.</p>');
      }
    },
    error: function () {
      container.html('<p>Error al cargar eventos.</p>');
    }
  });
}
window.onload = CargarEventos();
//                <td>${evento.titulo.slice(0, 80)}${evento.titulo.length > 80 ? '...' : ''}</td>


//Crear evento
$("#btnAgregarEvento").on("click", function () {

  let token = localStorage.getItem("token");

  var titulo = document.getElementById("inputTitulo").value;
  var tipo = document.getElementById("selectTipo").value;
  var fecha = document.getElementById("inputAnio").value;

const soloFecha = fecha.split("T");


  const datos = { titulo, tipo, ano: soloFecha }

    console.log(datos);


  if (titulo == " ") {
    document.getElementById("inputTitulo").focus();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El campo titulo no puede estar vacío.',
    });
  }
  else if (tipo == 0) {
    document.getElementById("selectTipo").focus();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debe seleccionar un tipo.',
    });
  }
  else if (fecha == "") {
    document.getElementById("inputAnio").focus();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debe seleccionar la fecha.',
    });
  }
  else {
    $.ajax({

      url: 'https://efemerides.elkin.click/api/efemeride/crear/',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(datos),
      headers: {
        "Authorization": "Bearer " + token
      },
      success: function (response) {
        if (response.rta) {
          Swal.fire({
            title: '¡Éxito!',
            text: response.message,
            icon: 'success',
            iconColor: '#66CAF2',
            confirmButtonColor: '#66CAF2',
          }).then(() => {
            $("#modalAgregarEvento").modal('hide');
            CargarEventos();
          });

          $("#modalAgregarEvento").modal('hide');

        } else {
          Swal.fire('Error', response.message, 'error');
        }
      },
      error: function () {
        Swal.fire('Error', 'No se pudo guardar el evento', 'error');
      }
    });
  }
});


function openEditModalEvento(button) {
  const fila = button.closest("tr");

  const id = fila.cells[0].textContent.trim();
  const titulo = fila.cells[1].textContent.trim();
  const tipo = fila.cells[2].textContent.trim();
  const fecha = fila.cells[3].textContent.trim();

  var tipoMensaje = "";

  console.log(id);
  $("#inputId").val(id);
  $("#inputTitulo").val(titulo);

  if (tipo == "Nacimientos") {
    tipoMensaje = 1;
  }
  else if (tipo == "Muertes") {
    tipoMensaje = 2;
  }
  else if (tipo == "Acontecimientos") {
    tipoMensaje = 3;
  }
  document.getElementById("selectTipo").value = tipoMensaje;

  const soloFecha = fecha.split(" ")[0];

  $("#inputAnio").val(soloFecha);

  const btnAgregar = document.getElementById("btnAgregarEvento");
  const btnActualizar = document.getElementById("btnActualizarEvento");

  const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("modalAgregarEvento"));
  modal.show();

  btnActualizar.classList.remove("d-none");
  btnAgregar.classList.add("d-none");
  document.getElementById("modalAgregarEventoLabel").textContent = "Editar evento";
}


const modalEl = document.getElementById("modalAgregarEvento");

modalEl.addEventListener("show.bs.modal", function (event) {
  const trigger = event.relatedTarget;
  const btnActualizar = document.getElementById("btnActualizarEvento");
  const btnAgregar = document.getElementById("btnAgregarEvento");

  if (trigger && trigger.classList.contains("btn-edit")) {
    btnActualizar.classList.remove("d-none");
    btnAgregar.classList.add("d-none");
  } else {
    btnActualizar.classList.add("d-none");
    btnAgregar.classList.remove("d-none");

    document.getElementById("modalAgregarEventoLabel").textContent = "Agregar un nuevo evento";
  }
});

//Actualizar evento
$("#btnActualizarEvento").on("click", function () {

  let token = localStorage.getItem("token");

  var idEvento = document.getElementById("inputId").value;
  var titulo = document.getElementById("inputTitulo").value;
  var tipo = document.getElementById("selectTipo").value;
  var fecha = document.getElementById("inputAnio").value;

  const datos = { idEvento, titulo, tipo, fecha }

  if (idEvento == "") {
    document.getElementById("inputId").focus();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El campo id no puede estar vacío.',
    });
  }
  else if (titulo == "") {
    document.getElementById("inputTitulo").focus();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El campo titulo no puede estar vacío.',
    });
  }
  else if (tipo == 0) {
    document.getElementById("selectTipo").focus();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debe seleccionar un tipo.',
    });
  }
  else if (fecha == "") {
    document.getElementById("inputAnio").focus();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debe seleccionar la fecha.',
    });
  }
  else {
    $.ajax({

      url: 'https://efemerides.elkin.click/api/efemeride/actualizar/' + idEvento,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(datos),
      headers: {
        "Authorization": "Bearer " + token
      },
      success: function (response) {
        if (response.rta) {
          Swal.fire({
            title: '¡Éxito!',
            text: response.message,
            icon: 'success',
            iconColor: '#66CAF2',
            confirmButtonColor: '#66CAF2',
          }).then(() => {
            $("#modalAgregarEvento").modal('hide');
            CargarEventos();
          });

          $("#modalAgregarEvento").modal('hide');

        } else {
          Swal.fire('Error', response.message, 'error');
        }
      },
      error: function () {

        Swal.fire('Error', 'No se pudo actualizar el evento', 'error');
      }
    });
  }
});


//Eliminar evento
function eliminarEvento(idEvento) {

  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    iconColor: '#dc3545',
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: '#66CAF2',
    cancelButtonColor: '#dc3545'
  }).then((result) => {
    if (result.isConfirmed) {

      fetch(`https://efemerides.elkin.click/api/efemeride/borrar/${idEvento}`, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al eliminar");
          }
          return response.json();
        })
        .then((response) => {
          Swal.fire({
            title: '¡Éxito!',
            text: response.message,
            icon: 'success',
            iconColor: '#66CAF2',
            confirmButtonColor: '#66CAF2',
          });

          CargarEventos();
        })

        .catch((error) => {
          Swal.fire("Error", error.message, "error");
        });
    }
  });
}

