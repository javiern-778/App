<template>
  <div class="card p-4 shadow-sm bg-light rounded" style="max-width: 400px;">
    <h3 class="mb-4">{{ incidencia.id ? 'Editar Incidencia' : 'Crear Incidencia' }}</h3>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="descripcion" class="form-label">Descripción:</label>
        <input
          type="text"
          id="descripcion"
          v-model="incidencia.descripcion"
          required
          class="form-control"
          placeholder="Descripción de la incidencia"
        />
      </div>

      <div class="mb-3">
        <label for="fecha" class="form-label">Fecha:</label>
        <input
          type="date"
          id="fecha"
          v-model="incidencia.fecha"
          required
          class="form-control"
        />
      </div>

      <div class="mb-3">
        <label for="hora" class="form-label">Hora:</label>
        <input
          type="time"
          id="hora"
          v-model="incidencia.hora"
          required
          class="form-control"
        />
      </div>

      <div class="mb-3">
        <label for="estado" class="form-label">Estado:</label>
        <input
          type="text"
          id="estado"
          v-model="incidencia.estado"
          required
          class="form-control"
          placeholder="Estado actual"
        />
      </div>

      <button type="submit" class="btn btn-primary w-100">
        {{ incidencia.id ? 'Actualizar' : 'Crear' }} Incidencia
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  initialIncidencia: {
    type: Object,
    default: () => ({
      descripcion: '',
      fecha: '',
      hora: '',
      estado: '',
    }),
  },
})

const emit = defineEmits(['saved'])

const incidencia = reactive({ ...props.initialIncidencia })

watch(() => props.initialIncidencia, (newVal) => {
  Object.assign(incidencia, newVal)
})

async function submitForm() {
  try {
    if (incidencia.id) {
      await axios.put(`/incidencias/${incidencia.id}`, incidencia)
    } else {
      await axios.post('/incidencias', incidencia)
    }
    emit('saved')
  } catch (error) {
    alert('Error al guardar la incidencia')
    console.error(error)
  }
}
</script>
