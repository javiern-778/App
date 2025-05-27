<template>
  <div class="container mt-3">
    <TutoriaForm
      v-if="editando"
      :tutoriaEdit="tutoriaSeleccionada"
      @form-enviado="recargar"
      @cancelar-edicion="cancelarEdicion"
    />

    <h4 class="mt-4">Lista de Tutorías</h4>
    <table class="table table-bordered table-hover">
      <thead class="table-success">
        <tr>
          <th>ID</th>
          <th>Motivo</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Área</th>
          <th>Comentarios</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in tutorias" :key="t.id">
          <td>{{ t.id }}</td>
          <td>{{ t.motivo }}</td>
          <td>{{ t.fecha }}</td>
          <td>{{ t.hora }}</td>
          <td>{{ t.area }}</td>
          <td>{{ t.comentarios }}</td>
          <td>
            <button class="btn btn-sm btn-primary" @click="editarTutoria(t)">Editar</button>
            <button class="btn btn-sm btn-danger ms-1" @click="eliminarTutoria(t.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import TutoriaForm from './TutoriaForm.vue'

const tutorias = ref([])
const editando = ref(false)
const tutoriaSeleccionada = ref(null)

const fetchTutorias = async () => {
  try {
    const res = await axios.get('/tutorias')
    tutorias.value = res.data
  } catch (error) {
    alert('Error al cargar las tutorías')
    console.error(error)
  }
}

const editarTutoria = (t) => {
  tutoriaSeleccionada.value = { ...t }
  editando.value = true
}

const eliminarTutoria = async (id) => {
  if (!confirm('¿Seguro que deseas eliminar esta tutoría?')) return
  try {
    await axios.delete(`/tutorias/${id}`)
    alert('Tutoría eliminada correctamente')
    fetchTutorias()
  } catch (error) {
    alert('Error al eliminar la tutoría')
    console.error(error)
  }
}

const recargar = () => {
  fetchTutorias()
  cancelarEdicion()
}

const cancelarEdicion = () => {
  editando.value = false
  tutoriaSeleccionada.value = null
}

onMounted(fetchTutorias)
</script>
