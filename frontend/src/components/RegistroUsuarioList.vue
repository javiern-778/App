<template>
  <div class="container mt-4">
    <h4 class="mb-3">Lista de Usuarios</h4>
    <RegistroUsuarioForm v-if="editando" :usuarioEdit="usuarioEditado" @form-enviado="refrescar" @cancelar-edicion="cancelarEdicion" />
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Matrícula</th>
          <th>Teléfono</th>
          <th>Carrera</th>
          <th>Semestre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td>{{ usuario.nombreCompleto }}</td>
          <td>{{ usuario.correo }}</td>
          <td>{{ usuario.matricula }}</td>
          <td>{{ usuario.telefono }}</td>
          <td>{{ usuario.carrera }}</td>
          <td>{{ usuario.semestre }}</td>
          <td>
            <button class="btn btn-sm btn-warning me-2" @click="editarUsuario(usuario)">Editar</button>
            <button class="btn btn-sm btn-danger" @click="eliminarUsuario(usuario.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import RegistroUsuarioForm from './RegistroUsuarioForm.vue'

const usuarios = ref([])
const editando = ref(false)
const usuarioEditado = ref(null)

const cargarUsuarios = async () => {
  try {
    const res = await axios.get('/usuarios')
    usuarios.value = res.data
  } catch (e) {
    console.error('Error al cargar usuarios:', e)
  }
}

const editarUsuario = (usuario) => {
  usuarioEditado.value = { ...usuario }
  editando.value = true
}

const eliminarUsuario = async (id) => {
  if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) return
  try {
    await axios.delete(`/usuarios/${id}`)
    await cargarUsuarios()
  } catch (e) {
    console.error('Error al eliminar usuario:', e)
  }
}

const cancelarEdicion = () => {
  editando.value = false
  usuarioEditado.value = null
}

const refrescar = () => {
  cargarUsuarios()
  cancelarEdicion()
}

onMounted(cargarUsuarios)
</script>
