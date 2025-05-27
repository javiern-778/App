<template>
  <div class="card p-4 shadow-sm bg-light rounded" style="max-width: 450px;">
    <h3 class="mb-4">{{ inscripcion.id ? 'Editar Inscripción' : 'Crear Inscripción' }}</h3>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="curso" class="form-label">Curso:</label>
        <input
          type="text"
          id="curso"
          v-model="inscripcion.curso"
          class="form-control"
          placeholder="Nombre del curso"
        />
        <div v-if="errores.curso" class="text-danger small mt-1">{{ errores.curso }}</div>
      </div>

      <div class="mb-3">
        <label for="fechaInscripcion" class="form-label">Fecha Inscripción:</label>
        <input
          type="date"
          id="fechaInscripcion"
          v-model="inscripcion.fechaInscripcion"
          class="form-control"
        />
        <div v-if="errores.fechaInscripcion" class="text-danger small mt-1">{{ errores.fechaInscripcion }}</div>
      </div>

      <div class="mb-3">
        <label for="estado" class="form-label">Estado:</label>
        <input
          type="text"
          id="estado"
          v-model="inscripcion.estado"
          class="form-control"
          placeholder="Estado de la inscripción"
        />
        <div v-if="errores.estado" class="text-danger small mt-1">{{ errores.estado }}</div>
      </div>

      <div class="mb-3">
        <label for="comentarios" class="form-label">Comentarios:</label>
        <textarea
          id="comentarios"
          v-model="inscripcion.comentarios"
          class="form-control"
          rows="3"
          placeholder="Comentarios adicionales (opcional)"
        ></textarea>
      </div>

      <button type="submit" class="btn btn-success w-100">
        {{ inscripcion.id ? 'Actualizar' : 'Crear' }} Inscripción
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  initialInscripcion: {
    type: Object,
    default: () => ({
      curso: '',
      fechaInscripcion: '',
      estado: '',
      comentarios: '',
    }),
  },
})

const emit = defineEmits(['saved'])

const inscripcion = reactive({ ...props.initialInscripcion })

const errores = reactive({
  curso: '',
  fechaInscripcion: '',
  estado: '',
})

watch(() => props.initialInscripcion, (newVal) => {
  Object.assign(inscripcion, newVal)
  clearErrors()
})

function clearErrors() {
  errores.curso = ''
  errores.fechaInscripcion = ''
  errores.estado = ''
}

function validar() {
  clearErrors()
  let valido = true

  if (!inscripcion.curso || inscripcion.curso.trim().length < 3) {
    errores.curso = 'El curso es obligatorio y debe tener al menos 3 caracteres.'
    valido = false
  }

  if (!inscripcion.fechaInscripcion) {
    errores.fechaInscripcion = 'La fecha de inscripción es obligatoria.'
    valido = false
  }

  if (!inscripcion.estado || inscripcion.estado.trim().length < 3) {
    errores.estado = 'El estado es obligatorio y debe tener al menos 3 caracteres.'
    valido = false
  }

  return valido
}

async function submitForm() {
  if (!validar()) return

  try {
    if (inscripcion.id) {
      await axios.put(`/inscripciones/${inscripcion.id}`, inscripcion)
    } else {
      await axios.post('/inscripciones', inscripcion)
    }
    emit('saved')
  } catch (error) {
    alert('Error al guardar la inscripción')
    console.error(error)
  }
}
</script>
