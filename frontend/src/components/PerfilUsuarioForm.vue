<template>
  <div class="card p-4 shadow-sm bg-light rounded" style="max-width: 500px; margin-bottom: 2rem;">
    <h3 class="mb-4">Registrar Perfil</h3>
    <form @submit.prevent="submitForm" novalidate>
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre <span class="text-danger">*</span></label>
        <input
          id="nombre"
          v-model="perfil.nombre"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errores.nombre }"
          placeholder="Nombre completo"
        />
        <div v-if="errores.nombre" class="invalid-feedback">{{ errores.nombre }}</div>
      </div>

      <div class="mb-3">
        <label for="telefono" class="form-label">Teléfono</label>
        <input
          id="telefono"
          v-model="perfil.telefono"
          type="tel"
          class="form-control"
          placeholder="Ejemplo: 555-123-4567"
        />
      </div>

      <div class="mb-3">
        <label for="correo" class="form-label">Correo</label>
        <input
          id="correo"
          v-model="perfil.correo"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errores.correo }"
          placeholder="ejemplo@correo.com"
        />
        <div v-if="errores.correo" class="invalid-feedback">{{ errores.correo }}</div>
      </div>

      <div class="mb-3">
        <label for="carrera" class="form-label">Carrera</label>
        <input
          id="carrera"
          v-model="perfil.carrera"
          type="text"
          class="form-control"
          placeholder="Ejemplo: Ingeniería en Sistemas"
        />
      </div>

      <div class="mb-3">
        <label for="semestre" class="form-label">Semestre</label>
        <input
          id="semestre"
          v-model="perfil.semestre"
          type="text"
          class="form-control"
          placeholder="Ejemplo: 5to"
        />
      </div>

      <div class="mb-3">
        <label for="contactoEmergencia" class="form-label">Contacto de Emergencia</label>
        <input
          id="contactoEmergencia"
          v-model="perfil.contactoEmergencia"
          type="text"
          class="form-control"
          placeholder="Nombre y teléfono"
        />
      </div>

      <button type="submit" class="btn btn-success w-100">Guardar</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'

const perfil = reactive({
  nombre: '',
  telefono: '',
  correo: '',
  carrera: '',
  semestre: '',
  contactoEmergencia: '',
})

const errores = reactive({
  nombre: '',
  correo: '',
})

function validarEmail(email) {
  // Expresión simple para validar email
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validar() {
  errores.nombre = ''
  errores.correo = ''

  let valido = true

  if (!perfil.nombre.trim()) {
    errores.nombre = 'El nombre es obligatorio.'
    valido = false
  }

  if (perfil.correo && !validarEmail(perfil.correo)) {
    errores.correo = 'El correo no es válido.'
    valido = false
  }

  return valido
}

const submitForm = async () => {
  if (!validar()) return

  try {
    await axios.post('/perfiles', perfil)
    alert('Perfil registrado exitosamente')
    // Limpiar formulario
    Object.keys(perfil).forEach((key) => (perfil[key] = ''))
  } catch (error) {
    console.error('Error al registrar perfil:', error)
    alert('Error al registrar perfil')
  }
}
</script>
