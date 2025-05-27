<template>
  <div class="card p-4 shadow-sm rounded mt-3" style="max-width: 600px; margin: auto;">
    <h5 class="mb-4">{{ form.id ? 'Editar Proyecto' : 'Registrar Proyecto' }}</h5>
    <form @submit.prevent="submitForm" novalidate>
      <!-- Campos del formulario (sin cambios) -->
      <!-- ... -->
    </form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { db } from '@/firebase'
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore'

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
      const docRef = doc(db, 'proyectos', form.id)
      await updateDoc(docRef, {
        nombre: form.nombre,
        descripcion: form.descripcion,
        fechaInicio: form.fechaInicio,
        fechaFin: form.fechaFin,
        estado: form.estado
      })
      alert('Proyecto actualizado correctamente')
    } else {
      const docRef = await addDoc(collection(db, 'proyectos'), {
        nombre: form.nombre,
        descripcion: form.descripcion,
        fechaInicio: form.fechaInicio,
        fechaFin: form.fechaFin,
        estado: form.estado
      })
      form.id = docRef.id
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
