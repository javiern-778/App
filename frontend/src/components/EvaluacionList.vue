<template>
  <div class="container mt-4">
    <h2 class="mb-4">Lista de Evaluaciones</h2>
    <button @click="crearNueva" class="btn btn-success mb-3">
      Nueva Evaluación
    </button>

    <ul class="list-group mb-4">
      <li
        v-for="ev in evaluaciones"
        :key="ev.id"
        class="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center"
      >
        <div>
          <strong>{{ ev.tipo }}</strong> - 
          <span class="text-primary">Calificación: {{ ev.calificacion }}</span>
          <br />
          <small>Comentarios: {{ ev.comentarios }}</small>
          <br />
          <small>Sugerencias: {{ ev.sugerencias }}</small>
          <br />
          <!-- Mostrar "Es este" solo si está seleccionada -->
          <span
            v-if="evaluacionSeleccionada && evaluacionSeleccionada.id === ev.id"
            class="badge bg-info mt-2"
          >
            Es este
          </span>
        </div>
        <div class="mt-2 mt-md-0">
          <button
            class="btn btn-outline-primary btn-sm me-2"
            @click="editar(ev)"
          >
            Editar
          </button>
          <button
            class="btn btn-outline-danger btn-sm"
            @click="eliminar(ev.id)"
          >
            Eliminar
          </button>
        </div>
      </li>
    </ul>

    <div v-if="evaluacionSeleccionada" class="mb-4">
      <EvaluacionForm
        :initialEvaluacion="evaluacionSeleccionada"
        @saved="onGuardado"
      />
      <button
        @click="cancelar"
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
import EvaluacionForm from './EvaluacionForm.vue'

const evaluaciones = ref([])
const evaluacionSeleccionada = ref(null)

async function cargarEvaluaciones() {
  try {
    const res = await axios.get('/evaluaciones')
    evaluaciones.value = res.data
  } catch (error) {
    alert('Error al cargar evaluaciones')
    console.error(error)
  }
}

function crearNueva() {
  evaluacionSeleccionada.value = {
    tipo: '',
    comentarios: '',
    calificacion: 0,
    sugerencias: ''
  }
}

function editar(ev) {
  evaluacionSeleccionada.value = { ...ev }
}

function cancelar() {
  evaluacionSeleccionada.value = null
}

function onGuardado() {
  evaluacionSeleccionada.value = null
  cargarEvaluaciones()
}

async function eliminar(id) {
  if (confirm('¿Estás seguro de eliminar esta evaluación?')) {
    try {
      await axios.delete(`/evaluaciones/${id}`)
      cargarEvaluaciones()
    } catch (error) {
      alert('Error al eliminar evaluación')
      console.error(error)
    }
  }
}

onMounted(() => {
  cargarEvaluaciones()
})
</script>
