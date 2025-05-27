<template>
  <div class="card p-4 shadow-sm rounded mt-3" style="max-width: 600px; margin: auto;">
    <h5 class="mb-4">{{ form.id ? 'Editar Proyecto' : 'Registrar Proyecto' }}</h5>
    <form @submit.prevent="submitForm" novalidate>
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre <span class="text-danger">*</span></label>
        <input
          id="nombre"
          v-model="form.nombre"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errores.nombre }"
          placeholder="Nombre del proyecto"
        />
        <div v-if="errores.nombre" class="invalid-feedback">{{ errores.nombre }}</div>
      </div>

      <div class="mb-3">
        <label for="descripcion" class="form-label">Descripción <span class="text-danger">*</span></label>
        <textarea
          id="descripcion"
          v-model="form.descripcion"
          class="form-control"
          rows="3"
          :class="{ 'is-invalid': errores.descripcion }"
          placeholder="Descripción del proyecto"
        ></textarea>
        <div v-if="errores.descripcion" class="invalid-feedback">{{ errores.descripcion }}</div>
      </div>

      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label for="fechaInicio" class="form-label">Fecha de Inicio <span class="text-danger">*</span></label>
          <input
            id="fechaInicio"
            v-model="form.fechaInicio"
            type="date"
            class="form-control"
            :class="{ 'is-invalid': errores.fechaInicio }"
          />
          <div v-if="errores.fechaInicio" class="invalid-feedback">{{ errores.fechaInicio }}</div>
        </div>

        <div class="col-md-6">
          <label for="fechaFin" class="form-label">Fecha de Fin <span class="text-danger">*</span></label>
          <input
            id="fechaFin"
            v-model="form.fechaFin"
            type="date"
            class="form-control"
            :class="{ 'is-invalid': errores.fechaFin }"
          />
          <div v-if="errores.fechaFin" class="invalid-feedback">{{ errores.fechaFin }}</div>
        </div>
      </div>

      <div class="mb-4">
        <label for="estado" class="form-label">Estado <span class="text-danger">*</span></label>
        <input
          id="estado"
          v-model="form.estado"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errores.estado }"
          placeholder="Estado del proyecto"
        />
        <div v-if="errores.estado" class="invalid-feedback">{{ errores.estado }}</div>
      </div>

      <div class="d-flex gap-2">
        <button type="submit" class="btn btn-primary flex-grow-1">
          {{ form.id ? 'Actualizar' : 'Guardar' }}
        </button>
        <button
          v-if="form.id"
          type="button"
          class="btn btn-secondary flex-grow-1"
          @click="cancelarEdicion"
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  proyectoEdit: {
    type: Object,
    default: () => null,
  },
})

const emit = defineEmits(['saved', 'cancel'])

const form = reactive({
  id: null,
  nombre: '',
  descripcion: '',
  fechaInicio: '',
  fechaFin: '',
  estado: '',
})

const errores = reactive({
  nombre: '',
  descripcion: '',
  fechaInicio: '',
  fechaFin: '',
  estado: '',
})

watch(
  () => props.proyectoEdit,
  (nuevo) => {
    if (nuevo) {
      Object.assign(form, nuevo)
    } else {
      resetForm()
    }
    clearErrors()
  },
  { immediate: true }
)

function resetForm() {
  form.id = null
  form.nombre = ''
  form.descripcion = ''
  form.fechaInicio = ''
  form.fechaFin = ''
  form.estado = ''
}

function clearErrors() {
  for (const key in errores) {
    errores[key] = ''
  }
}

function validar() {
  clearErrors()
  let valido = true

  if (!form.nombre.trim()) {
    errores.nombre = 'El nombre es obligatorio.'
    valido = false
  }
  if (!form.descripcion.trim()) {
    errores.descripcion = 'La descripción es obligatoria.'
    valido = false
  }
  if (!form.fechaInicio) {
    errores.fechaInicio = 'La fecha de inicio es obligatoria.'
    valido = false
  }
  if (!form.fechaFin) {
    errores.fechaFin = 'La fecha de fin es obligatoria.'
    valido = false
  }
  if (form.fechaInicio && form.fechaFin && form.fechaFin < form.fechaInicio) {
    errores.fechaFin = 'La fecha de fin no puede ser anterior a la fecha de inicio.'
    valido = false
  }
  if (!form.estado.trim()) {
    errores.estado = 'El estado es obligatorio.'
    valido = false
  }

  return valido
}

async function submitForm() {
  if (!validar()) return

  try {
    if (form.id) {
      await axios.put(`/proyectos/${form.id}`, form)
      alert('Proyecto actualizado correctamente')
    } else {
      await axios.post('/proyectos', form)
      alert('Proyecto guardado correctamente')
    }
    resetForm()
    emit('saved')
  } catch (error) {
    console.error(error)
    alert('Error al guardar el proyecto')
  }
}

function cancelarEdicion() {
  resetForm()
  clearErrors()
  emit('cancel')
}
</script>
