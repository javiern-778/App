<template>
  <div class="container mt-4">
    <h3 class="mb-3">Lista de Perfiles</h3>
    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle">
        <thead class="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Carrera</th>
            <th>Semestre</th>
            <th>Contacto Emergencia</th>
            <th>Acciones</th> <!-- Columna añadida -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="perfil in perfiles" :key="perfil.id">
            <td>{{ perfil.nombre }}</td>
            <td>{{ perfil.telefono }}</td>
            <td>{{ perfil.correo }}</td>
            <td>{{ perfil.carrera }}</td>
            <td>{{ perfil.semestre }}</td>
            <td>{{ perfil.contactoEmergencia }}</td>
            <td>
              <button class="btn btn-sm btn-outline-warning me-2" @click="editar(perfil)">
                Editar
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="eliminar(perfil.id)">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const perfiles = ref([])

const cargarPerfiles = async () => {
  try {
    const response = await axios.get('/perfiles')
    perfiles.value = response.data
  } catch (error) {
    console.error('Error al cargar perfiles:', error)
  }
}

const editar = (perfil) => {
  alert(`Editar perfil: ${perfil.nombre}`)
}

const eliminar = async (id) => {
  if (confirm('¿Seguro que quieres eliminar este perfil?')) {
    try {
      await axios.delete(`/perfiles/${id}`)
      cargarPerfiles()
    } catch (error) {
      console.error('Error al eliminar perfil:', error)
      alert('No se pudo eliminar el perfil.')
    }
  }
}

onMounted(cargarPerfiles)
</script>
