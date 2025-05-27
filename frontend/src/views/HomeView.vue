<template>
  <div v-if="isLoggedIn">
    <!-- Barra de navegación responsiva con degradado -->
    <nav class="navbar navbar-expand-lg navbar-dark navbar-gradient px-3">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Menú</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item"><router-link to="/actividades" class="nav-link">Actividades</router-link></li>
            <li class="nav-item"><router-link to="/evaluaciones" class="nav-link">Evaluaciones</router-link></li>
            <li class="nav-item"><router-link to="/incidencias" class="nav-link">Incidencias</router-link></li>
            <li class="nav-item"><router-link to="/inscripciones" class="nav-link">Inscripciones</router-link></li>
            <li class="nav-item"><router-link to="/perfil" class="nav-link">Perfil</router-link></li>
            <li class="nav-item"><router-link to="/proyectos" class="nav-link">Proyectos</router-link></li>
            <li class="nav-item"><router-link to="/usuarios" class="nav-link">Usuarios</router-link></li>
            <li class="nav-item"><router-link to="/tutorias" class="nav-link">Tutorías</router-link></li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Sección de bienvenida responsiva -->
    <section class="welcome-section text-center py-5 bg-light d-flex flex-column align-items-center justify-content-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        fill="#0d6efd"
        class="mb-4 logo-animate"
        viewBox="0 0 16 16"
        role="img"
        aria-label="Logo de Residentes de Sistemas"
      >
        <circle cx="8" cy="8" r="7" stroke="#0d6efd" stroke-width="2" fill="none" />
        <path d="M4.5 7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" fill="#0d6efd" />
      </svg>

      <h1 class="display-6 fw-bold text-primary shadow-text px-3">Bienvenidos a la APP DE RESIDENTES DE SISTEMAS</h1>
      <p class="lead text-secondary px-3">Gestiona tus actividades, evaluaciones y mucho más desde un solo lugar</p>
    </section>
  </div>
</template>

<script setup>
const isLoggedIn = !!localStorage.getItem('token')
</script>

<style scoped>
.navbar-gradient {
  background: linear-gradient(90deg, #080c03, #7bfece);
}

.welcome-section {
  min-height: 350px;
  animation: fadeInUp 1.5s ease forwards;
  opacity: 0;
  padding-left: 1rem;
  padding-right: 1rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo-animate {
  animation: pulse 2s ease-in-out infinite;
  filter: drop-shadow(0 0 6px #0d6efd80);
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 6px #0d6efd80);
  }
  50% {
    transform: scale(1.1);
    filter: drop-shadow(0 0 12px #0d6efdcc);
  }
}

.shadow-text {
  text-shadow: 1px 1px 3px rgba(13, 110, 253, 0.7);
}
</style>
