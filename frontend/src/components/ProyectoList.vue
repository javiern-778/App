<template>
  <div class="container mt-4" style="max-width: 900px;">
    <h5 class="mb-3">LISTA DE PROYECTOS</h5>

    <ProyectoForm
      :proyectoEdit="proyectoSeleccionado"
      @saved="recargarProyectos"
      @cancel="cancelarEdicion"
    />

    <ul class="list-group mt-4" v-if="proyectos.length">
      <li
        v-for="proyecto in proyectos"
        :key="proyecto.id"
        class="list-group-item shadow-sm rounded mb-2 d-flex justify-content-between align-items-start"
      >
        <div>
          <h6 class="mb-1">{{ proyecto.nombre }}</h6>
          <p class="mb-1">{{ proyecto.descripcion }}</p>
          <small class="text-muted">
            {{ proyecto.fechaInicio }} - {{ proyecto.fechaFin }} | Estado: {{ proyecto.estado }}
          </small>
        </div>

        <div class="btn-group btn-group-sm" role="group">
          <button class="btn btn-outline-primary" @click="editar(proyecto)">
            Editar
          </button>
          <button class="btn btn-outline-danger" @click="eliminar(proyecto.id)">
            Eliminar
          </button>
        </div>
      </li>
    </ul>

    <p v-else class="text-center text-muted">No hay proyectos registrados.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ProyectoForm from './ProyectoForm.vue'

const proyectos = ref([])
const proyectoSeleccionado = ref(null)

const cargarProyectos = async () => {
  try {
    const response = await axios.get('/proyectos')
    proyectos.value = response.data
  } catch (error) {
    console.error('Error al cargar proyectos:', error)
  }
}

const recargarProyectos = () => {
  proyectoSeleccionado.value = null
  cargarProyectos()
}

const editar = (proyecto) => {
  proyectoSeleccionado.value = { ...proyecto }
}

const cancelarEdicion = () => {
  proyectoSeleccionado.value = null
}

const eliminar = async (id) => {
  if (!confirm('¿Estás seguro de eliminar este proyecto?')) return

  try {
    await axios.delete(`/proyectos/${id}`)
    alert('Proyecto eliminado correctamente')
    cargarProyectos()
  } catch (error) {
    console.error(error)
    alert('Error al eliminar el proyecto')
  }
}

onMounted(() => {
  cargarProyectos()
})
</script>
