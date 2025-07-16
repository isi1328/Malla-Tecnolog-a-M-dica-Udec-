// script.js

// Ejemplo de estructura de ramos y prerequisitos
const ramos = [
  { id: 'anatomia', nombre: 'Anatomía', semestre: 1, prerequisito: null, estado: 'no-aprobado' },
  { id: 'fisica', nombre: 'Física General', semestre: 1, prerequisito: null, estado: 'no-aprobado' },
  { id: 'quimica', nombre: 'Química General', semestre: 1, prerequisito: null, estado: 'no-aprobado' },
  { id: 'bioetica', nombre: 'Bioética', semestre: 1, prerequisito: null, estado: 'no-aprobado' },
  { id: 'radiodiagnostico', nombre: 'Radiodiagnóstico I', semestre: 2, prerequisito: 'anatomia', estado: 'no-aprobado' },
  // Agrega más ramos según tu estructura
];

// Función para crear los elementos y asignar eventos
function crearMalla() {
  const contenedor = document.getElementById('malla');
  contenedor.innerHTML = '';

  ramos.forEach(ramo => {
    const div = document.createElement('div');
    div.className = `ramo ${ramo.estado}`;
    div.id = ramo.id;
    div.innerText = ramo.nombre;
    div.onclick = () => cambiarEstado(ramo.id);
    // Si el ramo está bloqueado, deshabilitar click
    if (ramo.estado === 'bloqueado') {
      div.style.cursor = 'not-allowed';
    }
    contenedor.appendChild(div);
  });
}

// Función para cambiar el estado del ramo
function cambiarEstado(id) {
  const ramo = ramos.find(r => r.id === id);
  if (!ramo || ramo.estado === 'bloqueado') return;

  if (ramo.estado === 'no-aprobado') {
    ramo.estado = 'aprobado';
  } else if (ramo.estado === 'aprobado') {
    ramo.estado = 'no-aprobado';
  }

  // Actualizar prerequisitos
  actualizarBloqueados();

  crearMalla();
}

// Función para bloquear o desbloquear ramos según prerequisitos
function actualizarBloqueados() {
  ramos.forEach(r => {
    if (r.prerequisito) {
      const prereq = ramos.find(r2 => r2.id === r.prerequisito);
      if (prereq && prereq.estado !== 'aprobado') {
        r.estado = 'bloqueado';
      } else if (r.estado === 'bloqueado') {
        r.estado = 'no-aprobado';
      }
    }
  });
}

// Inicializar la malla
crearMalla();
