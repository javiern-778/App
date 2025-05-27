<template>
  <div class="container mt-4">
    <h2 class="mb-4">Lista de Incidencias</h2>

    <ul class="list-group">
      <li
        v-for="incidencia in incidencias"
        :key="incidencia.id"
        class="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center"
      >
        <div>
          <strong>{{ incidencia.descripcion }}</strong><br />
          <small>{{ incidencia.fecha }} {{ incidencia.hora }}</small><br />
          <span class="badge bg-info text-dark">Estado: {{ incidencia.estado }}</span>
          <br />
          <span
            v-if="incidenciaSeleccionada && incidenciaSeleccionada.id === incidencia.id"
            class="badge bg-primary mt-2"
          >
            Es esta
          </span>
        </div>

        <div class="mt-2 mt-md-0">
          <button
            class="btn btn-outline-primary btn-sm me-2"
            @click="editar(incidencia)"
          >
            Editar
          </button>
          <button
            class="btn btn-outline-danger btn-sm"
            @click="eliminar(incidencia.id)"
          >
            Eliminar
          </button>
        </div>
      </li>
    </ul>

    <div v-if="incidenciaSeleccionada" class="mt-4">
      <IncidenciaForm
        :initialIncidencia="incidenciaSeleccionada"
        @saved="onGuardado"
      />
      <button @click="cancelar" class="btn btn-secondary mt-2">
        Cancelar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import IncidenciaForm from './IncidenciaForm.vue' // Asegúrate de tener este componente

const incidencias = ref([])
const incidenciaSeleccionada = ref(null)

const cargarIncidencias = async () => {
  try {
    const response = await axios.get('/incidencias')
    incidencias.value = response.data
  } catch (error) {
    console.error('Error al cargar las incidencias:', error)
    alert('Error al cargar las incidencias')
  }
}

function editar(incidencia) {
  incidenciaSeleccionada.value = { ...incidencia }
}

function cancelar() {
  incidenciaSeleccionada.value = null
}

function onGuardado() {
  incidenciaSeleccionada.value = null
  cargarIncidencias()
}

async function eliminar(id) {
  if (confirm('¿Estás seguro de eliminar esta incidencia?')) {
    try {
      await axios.delete(`/incidencias/${id}`)
      cargarIncidencias()
    } catch (error) {
      console.error('Error al eliminar la incidencia:', error)
      alert('No se pudo eliminar la incidencia')
    }
  }
}

onMounted(() => {
  cargarIncidencias()
})
</script>
