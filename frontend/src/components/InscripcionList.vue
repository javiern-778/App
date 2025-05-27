<template>
  <div class="container mt-4">
    <h2 class="mb-4">Lista de Inscripciones</h2>

    <button class="btn btn-primary mb-3" @click="crearNueva">Nueva Inscripción</button>

    <ul class="list-group">
      <li
        v-for="inscripcion in inscripciones"
        :key="inscripcion.id"
        class="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center"
      >
        <div>
          <strong>{{ inscripcion.curso }}</strong> - 
          {{ inscripcion.fechaInscripcion }} - 
          <span class="badge bg-secondary">{{ inscripcion.estado }}</span>
        </div>
        <div class="mt-2 mt-md-0">
          <button class="btn btn-sm btn-outline-warning me-2" @click="editar(inscripcion)">
            Editar
          </button>
          <button class="btn btn-sm btn-outline-danger" @click="eliminar(inscripcion.id)">
            Eliminar
          </button>
        </div>
      </li>
    </ul>

    <div v-if="inscripcionSeleccionada" class="mt-4">
      <InscripcionForm
        :initialInscripcion="inscripcionSeleccionada"
        @saved="cargarInscripciones"
      />
      <button class="btn btn-secondary mt-2" @click="cancelarEdicion">Cancelar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import InscripcionForm from './InscripcionForm.vue'

const inscripciones = ref([])
const inscripcionSeleccionada = ref(null)

const cargarInscripciones = async () => {
  try {
    const res = await axios.get('/inscripciones')
    inscripciones.value = res.data
    inscripcionSeleccionada.value = null
  } catch (error) {
    alert('Error al cargar inscripciones')
    console.error(error)
  }
}

const crearNueva = () => {
  inscripcionSeleccionada.value = {
    curso: '',
    fechaInscripcion: '',
    estado: '',
    comentarios: '',
  }
}

const editar = (inscripcion) => {
  inscripcionSeleccionada.value = { ...inscripcion }
}

const cancelarEdicion = () => {
  inscripcionSeleccionada.value = null
}

const eliminar = async (id) => {
  if (confirm('¿Estás seguro de eliminar esta inscripción?')) {
    try {
      await axios.delete(`/inscripciones/${id}`)
      cargarInscripciones()
    } catch (error) {
      console.error('Error al eliminar la inscripción:', error)
      alert('No se pudo eliminar la inscripción')
    }
  }
}

onMounted(cargarInscripciones)
</script>
