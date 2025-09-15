// Función para realizar la búsqueda en los eventos
function searchData() {
  const query = document
    .getElementById("datatable-search-input")
    .value.toLowerCase();

  const table = document.getElementById("tablaUsuarios");
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

function CargarUsuarios() {

  const tablaUSuarios = $("#tablaUsuarios");

  let token = localStorage.getItem("token");
  let nombre = localStorage.getItem("nombre");

  $.ajax({
    url: "https://efemerides.elkin.click/api/usuario/consultar",
    method: "GET",
    data: "",
    dataType: "json",
    headers: {
      "Authorization": "Bearer " + token
    },
    success: function (data) {
      if (data.rta) {

        tablaUSuarios.empty();

        data.usuarios.sort((a, b) => a.id - b.id);

        data.usuarios.forEach((usuario) => {
          const rowHTML = `
            <tr>
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido}</td>
                <td>${usuario.correo}</td>
                 <td>${usuario.id_rol}</td>
                <td>
                    <button class="transparent-btn btn-edit" onclick="openEditModal(this)">
                                <i class="fa-solid fa-pen"></i>
                            </button>

                <button class="transparent-btn" onclick="eliminarUsuario(${usuario.id})">
                                <i class="fa-solid fa-trash-alt"></i>
                            </button>
                </td>
            </tr>
        `;
          tablaUSuarios.append(rowHTML);
        });

        const selectUsuarios = document.getElementById("selectUsuarios");

        selectUsuarios.innerHTML = '<option value="">Seleccione un usuario</option>';

        data.usuarios.forEach(usuario => {
          const option = document.createElement("option");
          option.value = usuario.id;        
          option.textContent = usuario.nombre; 
          selectUsuarios.appendChild(option);
        });

      } else {
        container.html('<p>No hay usuarios disponibles.</p>');
      }
    },
    error: function () {
      container.html('<p>Error al cargar usuarios.</p>');
    }
  });
}

window.onload = CargarUsuarios();

//Cargar roles
function CargarRoles() {

  const selectRoles = $("#selectRoles");

  let token = localStorage.getItem("token");

  $.ajax({
    url: "https://efemerides.elkin.click/api/rol/consultar",
    method: "GET",
    data: "",
    dataType: "json",
    headers: {
      "Authorization": "Bearer " + token
    },
    success: function (data) {
      if (data.rta) {

        selectRoles.append('<option value="">Seleccione un rol</option>');

        data.Rol.forEach((rol) => {
          selectRoles.append(`<option value="${rol.id}">${rol.nombre}</option>`);
        });
      } else {
        container.html('<p>No hay usuarios disponibles.</p>');
      }
    },
    error: function () {
      container.html('<p>Error al cargar usuarios.</p>');
    }
  });
}

window.onload = CargarRoles();

//CRear usuario
$("#btnAgregar").on("click", function () {

  let token = localStorage.getItem("token");

  var nombre = document.getElementById("inputNombre").value;
  var apellido = document.getElementById("inputApellido").value;
  var correo = document.getElementById("inputCorreo").value;
  var clave = document.getElementById("inputContrasena").value;
  var rol_id = document.getElementById("selectRoles").value;

  const datos = { nombre, apellido, correo, rol_id, clave }

  if (nombre == "") {

    document.getElementById("inputNombre").focus();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El campo nombre no puede estar vacío.',
    });
  }
  else if (apellido == "") {
    document.getElementById("inputApellido").focus();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El campo apellido no puede estar vacío.',
    });
  }
  else if (correo == "") {
    document.getElementById("inputCorreo").focus();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El campo correo no puede estar vacío.',
    });
  }
  else if (clave == "") {
    document.getElementById("inputContrasena").focus();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El campo contraseña no puede estar vacío.',
    });
  }
  else if (rol_id == "") {
    document.getElementById("selectRoles").focus();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debe seleccionar un rol',
    });
  }
  else {
    $.ajax({

      url: 'https://efemerides.elkin.click/api/usuario/crear',
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
            $("#modalUsuario").modal('hide');
            CargarUsuarios();
          });

          $("#modalAgregarUsuario").modal('hide');

        } else {
          Swal.fire('Error', response.message, 'error');
        }
      },
      error: function () {
        Swal.fire('Error', 'No se pudo guardar el usuario', 'error');
      }
    });
  }
});

function openEditModal(button) {
  const fila = button.closest("tr");

  const id = fila.cells[0].textContent.trim();
  const nombre = fila.cells[1].textContent.trim();
  const apellido = fila.cells[2].textContent.trim();
  const correo = fila.cells[3].textContent.trim();
  const idRol = fila.cells[4].textContent.trim();

  $("#inputIdUsuario").val(id);
  $("#inputNombre").val(nombre);
  $("#inputApellido").val(apellido);
  $("#inputCorreo").val(correo);
  $("#selectRoles").val(idRol);

  const btnActualizar = document.getElementById("btnActualizar");
  const inputContrasena = document.getElementById("divContrasena");
  const btnAgregar = document.getElementById("btnAgregar");

  const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("modalAgregarUsuario"));
  modal.show();

  btnActualizar.classList.remove("d-none");
  inputContrasena.classList.add("d-none");
  btnAgregar.classList.add("d-none");
  document.getElementById("modalAgregarUsuarioLabel").textContent = "Editar usuario";
}

const modalEl = document.getElementById("modalAgregarUsuario");

modalEl.addEventListener("show.bs.modal", function (event) {
  const trigger = event.relatedTarget;
  const btnActualizar = document.getElementById("btnActualizar");
  const inputContrasena = document.getElementById("divContrasena");
  const btnAgregar = document.getElementById("btnAgregar");

  if (trigger && trigger.classList.contains("btn-edit")) {
    btnActualizar.classList.remove("d-none");

    inputContrasena.classList.add("d-none");
    btnAgregar.classList.add("d-none");
  } else {
    btnActualizar.classList.add("d-none");
    inputContrasena.classList.remove("d-none");
    btnAgregar.classList.remove("d-none");

    document.getElementById("modalAgregarUsuarioLabel").textContent = "Agregar un nuevo usuario";
  }
});

//Editar 
$("#btnActualizar").on("click", function () {

  console.log("entró a actualizar");
  let token = localStorage.getItem("token");

  var idUsuario = document.getElementById("inputIdUsuario").value;
  var nombre = document.getElementById("inputNombre").value;
  var apellido = document.getElementById("inputApellido").value;
  var correo = document.getElementById("inputCorreo").value;
  var id_rol = document.getElementById("selectRoles").value;

  console.log("Rol seleccionado:", id_rol);

  const datos = { idUsuario, nombre, apellido, correo, id_rol }

  console.log(datos);
  if (nombre == "") {

    document.getElementById("inputNombre").focus();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El campo nombre no puede estar vacío.',
    });
  }
  else if (apellido == "") {
    document.getElementById("inputApellido").focus();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El campo apellido no puede estar vacío.',
    });
  }
  else if (correo == "") {
    document.getElementById("inputCorreo").focus();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El campo correo no puede estar vacío.',
    });
  }
  else if (id_rol == "") {
    document.getElementById("selectRoles").focus();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debe seleccionar un rol',
    });
  }
  else {
    $.ajax({

      url: 'https://efemerides.elkin.click/api/usuario/actualizar/' + idUsuario,
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
            $("#modalUsuario").modal('hide');
            CargarUsuarios();
          });

          $("#modalAgregarUsuario").modal('hide');

        } else {
          Swal.fire('Error', response.message, 'error');
        }
      },
      error: function () {
        console.log(url);
        Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
      }
    });
  }
});


//Eliminar usuario 
/*function   eliminarUsuario(idUsuario) {

  console.log("entró a eliminar");

  let token = localStorage.getItem("token");

  //var idUsuario = document.getElementById("inputIdUsuario").value;

  //const datos = { idUsuario, nombre, apellido, correo, id_rol }
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¡Esta acción no se puede deshacer!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      /* $.ajax({
 
         url: 'https://efemerides.elkin.click/api/usuario/borrar/' + idUsuario,
         method: 'DELETE',
         contentType: 'application/json',
         data: JSON.stringify(""),
         headers: {
           "Authorization": "Bearer " + token
         },
         success: function (response) {
           if (response.rta) {
             Swal.fire('¡Éxito!', response.message, 'success').then(() => {
               $("#modalUsuario").modal('hide');
               CargarUsuarios();
             });
 
             $("#modalAgregarUsuario").modal('hide');
 
           } else {
             Swal.fire('Error', response.message, 'error');
           }
         },
         error: function () {
           Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
         }
       });

      await fetch("https://efemerides.elkin.click/api/usuario/borrar/6", {
        method: "DELETE",
        headers: {
          "accept": "/",
          "Authorization": "Bearer $2b$10$fAEACjVubAcycefxVe0qd.Ngdno7/OE45MVcib1F43eWQxttucvBu"
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Error en la petición: " + response.status);
          }
          return response.json(); // o response.text() si no devuelve JSON
        })
        .then(data => {
          console.log("Respuesta:", data);
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
  });
}*/

function eliminarUsuario(idUsuario) {

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

      fetch(`https://efemerides.elkin.click/api/usuario/borrar/${idUsuario}`, {
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

          CargarUsuarios();
        })
        .catch((error) => {
          Swal.fire("Error", error.message, "error");
        });
    }
  });
}

//Cambio de contraseña
$("#btnActualizarContrasena").on("click", function () {

  console.log("entró a actualizar contraseña");
  let token = localStorage.getItem("token");

  var idUsuario = document.getElementById("selectUsuarios").value;
  var clave = document.getElementById("inputContrasenaAc").value;


  console.log(clave);
  const datos = { idUsuario, clave}

  console.log(datos);
  if (idUsuario == 0) {

    document.getElementById("inputNombre").focus();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debe seleccionar un usuario.',
    });
  }
  else if (clave == "") {

    document.getElementById("inputContrasenaAc").focus();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El campo contraseña no puede estar vacío.',
    });
  }
  else {
    $.ajax({

      url: 'https://efemerides.elkin.click/api/usuario/actualizarClave/' + idUsuario,
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
            $("#modalCambiarContrasena").modal('hide');
            CargarUsuarios();
          });

          $("#modalCambiarContrasena").modal('hide');

        } else {
          Swal.fire('Error', response.message, 'error');
        }
      },
      error: function () {
        console.log(url);
        Swal.fire('Error', 'No se pudo actualizar la contraseña.', 'error');
      }
    });
  }
});