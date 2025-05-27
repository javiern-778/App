<template>
  <div class="card p-4 shadow-sm bg-light rounded">
    <h3 class="mb-4">{{ evaluacion.id ? 'Editar Evaluación' : 'Crear Evaluación' }}</h3>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="tipo" class="form-label">Tipo:</label>
        <input
          type="text"
          id="tipo"
          v-model="evaluacion.tipo"
          class="form-control"
          placeholder="Tipo de evaluación"
        />
        <div v-if="errores.tipo" class="text-danger small mt-1">{{ errores.tipo }}</div>
      </div>

      <div class="mb-3">
        <label for="comentarios" class="form-label">Comentarios:</label>
        <textarea
          id="comentarios"
          v-model="evaluacion.comentarios"
          class="form-control"
          rows="3"
          placeholder="Comentarios adicionales"
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="calificacion" class="form-label">Calificación:</label>
        <input
          type="number"
          id="calificacion"
          v-model.number="evaluacion.calificacion"
          class="form-control"
          min="0"
          max="100"
          placeholder="Ingrese la calificación"
        />
        <div v-if="errores.calificacion" class="text-danger small mt-1">{{ errores.calificacion }}</div>
      </div>

      <div class="mb-3">
        <label for="sugerencias" class="form-label">Sugerencias:</label>
        <textarea
          id="sugerencias"
          v-model="evaluacion.sugerencias"
          class="form-control"
          rows="3"
          placeholder="Sugerencias para mejorar"
        ></textarea>
      </div>

      <button type="submit" class="btn btn-primary w-100 mb-2">
        {{ evaluacion.id ? 'Actualizar' : 'Crear' }} Evaluación
      </button>

      <!-- Botón Eliminar solo si hay ID -->
      <button
        v-if="evaluacion.id"
        @click.prevent="eliminarEvaluacion"
        type="button"
        class="btn btn-danger w-100"
      >
        Eliminar Evaluación
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import axios from 'axios'
import { API_URL } from '../api'  // Ajusta ruta según tu estructura

const props = defineProps({
  initialEvaluacion: {
    type: Object,
    default: () => ({
      tipo: '',
      comentarios: '',
      calificacion: null,
      sugerencias: ''
    })
  }
})

const emit = defineEmits(['saved'])

const evaluacion = reactive({ ...props.initialEvaluacion })

const errores = reactive({
  tipo: '',
  calificacion: ''
})

watch(() => props.initialEvaluacion, (nueva) => {
  Object.assign(evaluacion, nueva)
  clearErrors()
})

function clearErrors() {
  errores.tipo = ''
  errores.calificacion = ''
}

function validar() {
  clearErrors()
  let valido = true

  if (!evaluacion.tipo || evaluacion.tipo.trim().length < 3) {
    errores.tipo = 'El tipo es obligatorio y debe tener al menos 3 caracteres.'
    valido = false
  }

  if (
    evaluacion.calificacion === null ||
    evaluacion.calificacion < 0 ||
    evaluacion.calificacion > 100
  ) {
    errores.calificacion = 'La calificación debe ser un número entre 0 y 100.'
    valido = false
  }

  return valido
}

async function submitForm() {
  if (!validar()) return

  try {
    if (evaluacion.id) {
      await axios.put(`${API_URL}/evaluaciones/${evaluacion.id}`, evaluacion)
    } else {
      await axios.post(`${API_URL}/evaluaciones`, evaluacion)
    }
    emit('saved')
  } catch (error) {
    alert('Error al guardar la evaluación')
    console.error(error)
  }
}

async function eliminarEvaluacion() {
  const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta evaluación?')
  if (!confirmacion) return

  try {
    await axios.delete(`${API_URL}/evaluaciones/${evaluacion.id}`)
    emit('saved') // Para actualizar la lista luego de eliminar
  } catch (error) {
    alert('Error al eliminar la evaluación')
    console.error(error)
  }
}
</script>
