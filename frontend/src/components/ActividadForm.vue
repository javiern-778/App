<template>
  <div class="card p-4 shadow-sm bg-light rounded">
    <h3 class="mb-4">{{ actividad.id ? 'Editar Actividad' : 'Crear Actividad' }}</h3>
    <form @submit.prevent="submitForm" novalidate>
      <div class="mb-3">
        <label for="descripcion" class="form-label">Descripción:</label>
        <input
          type="text"
          id="descripcion"
          v-model.trim="actividad.descripcion"
          :class="{'is-invalid': errores.descripcion}"
          class="form-control"
          placeholder="Descripción de la actividad"
        />
        <div class="invalid-feedback">{{ errores.descripcion }}</div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <label for="fechaInicio" class="form-label">Fecha Inicio:</label>
          <input
            type="date"
            id="fechaInicio"
            v-model="actividad.fechaInicio"
            :class="{'is-invalid': errores.fechaInicio}"
            class="form-control"
          />
          <div class="invalid-feedback">{{ errores.fechaInicio }}</div>
        </div>
        <div class="col">
          <label for="fechaFin" class="form-label">Fecha Fin:</label>
          <input
            type="date"
            id="fechaFin"
            v-model="actividad.fechaFin"
            :class="{'is-invalid': errores.fechaFin}"
            class="form-control"
          />
          <div class="invalid-feedback">{{ errores.fechaFin }}</div>
        </div>
      </div>

      <div class="mb-3">
        <label for="estado" class="form-label">Estado:</label>
        <input
          type="text"
          id="estado"
          v-model.trim="actividad.estado"
          :class="{'is-invalid': errores.estado}"
          class="form-control"
          placeholder="Estado de la actividad"
        />
        <div class="invalid-feedback">{{ errores.estado }}</div>
      </div>

      <div class="mb-3">
        <label for="comentarios" class="form-label">Comentarios:</label>
        <textarea
          id="comentarios"
          v-model="actividad.comentarios"
          class="form-control"
          rows="3"
          placeholder="Comentarios adicionales"
        ></textarea>
      </div>

      <button type="submit" class="btn btn-primary w-100">
        {{ actividad.id ? 'Actualizar' : 'Crear' }} Actividad
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  initialActividad: {
    type: Object,
    default: () => ({
      descripcion: '',
      fechaInicio: '',
      fechaFin: '',
      estado: '',
      comentarios: '',
    }),
  },
})

const emit = defineEmits(['saved'])

const actividad = reactive({ ...props.initialActividad })

watch(() => props.initialActividad, (newVal) => {
  Object.assign(actividad, newVal)
})

const errores = reactive({
  descripcion: '',
  fechaInicio: '',
  fechaFin: '',
  estado: '',
})

function validar() {
  errores.descripcion = actividad.descripcion ? '' : 'La descripción es obligatoria.'
  errores.fechaInicio = actividad.fechaInicio ? '' : 'La fecha de inicio es obligatoria.'
  errores.fechaFin = actividad.fechaFin ? '' : 'La fecha de fin es obligatoria.'
  errores.estado = actividad.estado ? '' : 'El estado es obligatorio.'

  // Validar fechas coherentes
  if (actividad.fechaInicio && actividad.fechaFin) {
    if (actividad.fechaFin < actividad.fechaInicio) {
      errores.fechaFin = 'La fecha de fin debe ser igual o posterior a la fecha de inicio.'
    }
  }

  // Devuelve true si no hay errores
  return !Object.values(errores).some(error => error.length > 0)
}

async function submitForm() {
  if (!validar()) {
    return
  }

  try {
    if (actividad.id) {
      await axios.put(`/actividades/${actividad.id}`, actividad)
    } else {
      await axios.post('/actividades', actividad)
    }
    emit('saved')
  } catch (error) {
    alert('Error al guardar la actividad')
    console.error(error)
  }
}
</script>
