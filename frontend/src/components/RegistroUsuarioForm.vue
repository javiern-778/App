<template>
  <div class="card p-4 shadow-sm rounded mt-3" style="max-width: 500px; margin: auto;">
    <h4 class="mb-4">Registrar Usuario</h4>
    <form @submit.prevent="submitForm" novalidate>
      <div class="mb-3">
        <input
          v-model="usuario.nombreCompleto"
          type="text"
          class="form-control"
          placeholder="Nombre Completo"
          :class="{ 'is-invalid': errores.nombreCompleto }"
        />
        <div v-if="errores.nombreCompleto" class="invalid-feedback">{{ errores.nombreCompleto }}</div>
      </div>

      <div class="mb-3">
        <input
          v-model="usuario.correo"
          type="email"
          class="form-control"
          placeholder="Correo"
          :class="{ 'is-invalid': errores.correo }"
        />
        <div v-if="errores.correo" class="invalid-feedback">{{ errores.correo }}</div>
      </div>

      <div class="mb-3">
        <input
          v-model="usuario.matricula"
          type="text"
          class="form-control"
          placeholder="Matrícula"
          :class="{ 'is-invalid': errores.matricula }"
        />
        <div v-if="errores.matricula" class="invalid-feedback">{{ errores.matricula }}</div>
      </div>

      <div class="mb-3">
        <input
          v-model="usuario.contrasena"
          type="password"
          class="form-control"
          placeholder="Contraseña"
          :class="{ 'is-invalid': errores.contrasena }"
        />
        <div v-if="errores.contrasena" class="invalid-feedback">{{ errores.contrasena }}</div>
      </div>

      <div class="mb-3">
        <input
          v-model="usuario.telefono"
          type="tel"
          class="form-control"
          placeholder="Teléfono"
          :class="{ 'is-invalid': errores.telefono }"
        />
        <div v-if="errores.telefono" class="invalid-feedback">{{ errores.telefono }}</div>
      </div>

      <div class="mb-3">
        <input
          v-model="usuario.carrera"
          type="text"
          class="form-control"
          placeholder="Carrera"
          :class="{ 'is-invalid': errores.carrera }"
        />
        <div v-if="errores.carrera" class="invalid-feedback">{{ errores.carrera }}</div>
      </div>

      <div class="mb-3">
        <input
          v-model.number="usuario.semestre"
          type="number"
          min="1"
          max="20"
          class="form-control"
          placeholder="Semestre"
          :class="{ 'is-invalid': errores.semestre }"
        />
        <div v-if="errores.semestre" class="invalid-feedback">{{ errores.semestre }}</div>
      </div>

      <div class="mb-4">
        <label class="form-label">Foto de Perfil</label>
        <input type="file" @change="handleFileUpload" class="form-control" />
      </div>

      <button type="submit" class="btn btn-primary w-100">Guardar</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'

const usuario = reactive({
  nombreCompleto: '',
  correo: '',
  matricula: '',
  contrasena: '',
  telefono: '',
  carrera: '',
  semestre: '',
  fotoPerfil: null,
})

const errores = reactive({
  nombreCompleto: '',
  correo: '',
  matricula: '',
  contrasena: '',
  telefono: '',
  carrera: '',
  semestre: '',
})

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    usuario.fotoPerfil = reader.result.split(',')[1] // Base64 sin encabezado
  }
  reader.readAsDataURL(file)
}

function validar() {
  // Limpiar errores previos
  Object.keys(errores).forEach(key => errores[key] = '')

  let valido = true

  if (!usuario.nombreCompleto.trim()) {
    errores.nombreCompleto = 'El nombre completo es obligatorio.'
    valido = false
  }

  if (!usuario.correo.trim()) {
    errores.correo = 'El correo es obligatorio.'
    valido = false
  } else if (!/\S+@\S+\.\S+/.test(usuario.correo)) {
    errores.correo = 'Ingrese un correo válido.'
    valido = false
  }

  if (!usuario.matricula.trim()) {
    errores.matricula = 'La matrícula es obligatoria.'
    valido = false
  }

  if (!usuario.contrasena.trim()) {
    errores.contrasena = 'La contraseña es obligatoria.'
    valido = false
  }

  if (!usuario.telefono.trim()) {
    errores.telefono = 'El teléfono es obligatorio.'
    valido = false
  }

  if (!usuario.carrera.trim()) {
    errores.carrera = 'La carrera es obligatoria.'
    valido = false
  }

  if (
    usuario.semestre === null ||
    usuario.semestre === '' ||
    usuario.semestre < 1 ||
    usuario.semestre > 20
  ) {
    errores.semestre = 'El semestre debe estar entre 1 y 20.'
    valido = false
  }

  return valido
}

async function submitForm() {
  if (!validar()) return

  try {
    await axios.post('/usuarios', usuario)
    alert('Usuario registrado')
    // Limpiar formulario tras guardar
    Object.keys(usuario).forEach(key => usuario[key] = key === 'fotoPerfil' ? null : '')
  } catch (error) {
    console.error('Error al registrar usuario:', error)
    alert('Error al registrar usuario')
  }
}
</script>
