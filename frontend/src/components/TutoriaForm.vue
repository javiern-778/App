<template>
  <div class="card p-4 shadow-sm rounded mb-4">
    <h4 class="mb-3">{{ tutoria.id ? 'Editar Tutoría' : 'Registrar Tutoría' }}</h4>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label class="form-label">Motivo</label>
        <input v-model="tutoria.motivo" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Fecha</label>
        <input v-model="tutoria.fecha" type="date" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Hora</label>
        <input v-model="tutoria.hora" type="time" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Área</label>
        <input v-model="tutoria.area" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Comentarios</label>
        <textarea v-model="tutoria.comentarios" class="form-control" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-success">{{ tutoria.id ? 'Actualizar' : 'Guardar' }}</button>
      <button type="button" class="btn btn-secondary ms-2" @click="cancelar">Cancelar</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import axios from 'axios'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  tutoriaEdit: Object
})

const emit = defineEmits(['form-enviado', 'cancelar-edicion'])

const tutoria = reactive({
  id: null,
  motivo: '',
  fecha: '',
  hora: '',
  area: '',
  comentarios: ''
})

watch(() => props.tutoriaEdit, (nuevo) => {
  if (nuevo) Object.assign(tutoria, nuevo)
}, { immediate: true })

const submitForm = async () => {
  try {
    if (tutoria.id) {
      await axios.put(`/tutorias/${tutoria.id}`, tutoria)
      alert('Tutoría actualizada correctamente')
    } else {
      await axios.post('/tutorias', tutoria)
      alert('Tutoría registrada correctamente')
    }
    emit('form-enviado')
    resetForm()
  } catch (error) {
    alert('Error al guardar la tutoría')
    console.error(error)
  }
}

const resetForm = () => {
  tutoria.id = null
  tutoria.motivo = ''
  tutoria.fecha = ''
  tutoria.hora = ''
  tutoria.area = ''
  tutoria.comentarios = ''
}

const cancelar = () => {
  resetForm()
  emit('cancelar-edicion')
}
</script>
