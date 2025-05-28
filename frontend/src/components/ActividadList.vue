<template>
  <div class="container mt-4">
    <h2 class="mb-4">Lista de Actividades</h2>
    <button @click="crearNueva" class="btn btn-success mb-3">
      Nueva Actividad
    </button>

    <ul class="list-group mb-4">
      <li
        v-for="actividad in actividades"
        :key="actividad.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          <strong>{{ actividad.descripcion }}</strong>
          <br />
          <small>
            {{ actividad.fechaInicio }} - {{ actividad.fechaFin }} | Estado: {{ actividad.estado }}
          </small>
        </div>
        <div>
          <button
            class="btn btn-outline-primary btn-sm me-2"
            @click="editar(actividad)"
          >
            Editar
          </button>
          <button
            class="btn btn-outline-danger btn-sm"
            @click="eliminar(actividad.id)"
          >
            Eliminar
          </button>
        </div>
      </li>
    </ul>

    <div v-if="actividadSeleccionada" class="mb-4">
      <ActividadForm
        :initialActividad="actividadSeleccionada"
        @saved="onActividadGuardada"
      />
      <button
        @click="cancelarEdicion"
        class="btn btn-secondary mt-3"
      >
        Cancelar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ActividadForm from './ActividadForm.vue'
import { API_URL } from '../api'  // Ajusta ruta según tu estructura
import { db } from '@/firebase' // Asegúrate de tener firebase.js con esta exportación
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'


const actividades = ref([])
const actividadSeleccionada = ref(null)

async function cargarActividades() {
  try {
    const snapshot = await getDocs(collection(db, 'actividades'))
    actividades.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    alert('Error al cargar actividades')
    console.error(error)
  }
}


function crearNueva() {
  actividadSeleccionada.value = {
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    estado: '',
    comentarios: ''
  }
}

function editar(actividad) {
  actividadSeleccionada.value = { ...actividad }
}

function cancelarEdicion() {
  actividadSeleccionada.value = null
}

function onActividadGuardada() {
  actividadSeleccionada.value = null
  cargarActividades()
}

async function eliminar(id) {
  if (confirm('¿Seguro que quieres eliminar esta actividad?')) {
    try {
      await deleteDoc(doc(db, 'actividades', id))
      cargarActividades()
    } catch (error) {
      alert('No se pudo eliminar la actividad.')
      console.error(error)
    }
  }
}


onMounted(() => {
  cargarActividades()
})
</script>
