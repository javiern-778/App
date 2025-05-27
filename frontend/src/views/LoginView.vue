<template>
  <div class="login-container">
    <h2>🌸 Iniciar Sesión</h2>
    <form @submit.prevent="login">
      <input v-model="usuario" type="text" placeholder="Usuario" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Entrar</button>
    </form>
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const usuario = ref('')
const password = ref('')
const errorMsg = ref('')

const router = useRouter()

const USUARIO_CORRECTO = 'admin'
const PASSWORD_CORRECTA = '12345'

function login() {
  if (usuario.value === USUARIO_CORRECTO && password.value === PASSWORD_CORRECTA) {
    localStorage.setItem('token', 'token-falso-de-prueba')
    router.push('/home')
  } else {
    errorMsg.value = 'Credenciales incorrectas'
  }
}
</script>

<style scoped>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(120deg, #fce4ec, #f8bbd0);
  margin: 0;
  padding: 0;
}

.login-container {
  background-color: #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 5rem auto;
  padding: 2.5rem;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
}

.login-container h2 {
  margin-bottom: 1.5rem;
  color: #c2185b;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 0.8rem;
  margin: 0.7rem 0;
  border: 1px solid #f48fb1;
  border-radius: 8px;
  font-size: 1rem;
  transition: 0.2s;
}

input:focus {
  outline: none;
  border-color: #ec407a;
  box-shadow: 0 0 5px #f48fb1;
}

button {
  width: 100%;
  background-color: #ec407a;
  color: white;
  border: none;
  padding: 0.9rem;
  border-radius: 10px;
  font-size: 1rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #d81b60;
}

.error {
  color: #d32f2f;
  margin-top: 1rem;
  font-weight: 500;
}
</style>
