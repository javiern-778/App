import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import ActividadView from '../views/ActividadView.vue'
import EvaluacionView from '../views/EvaluacionView.vue'
import IncidenciaView from '../views/IncidenciaView.vue'
import IncripcionView from '../views/IncripcionView.vue'
import PerfilUsuarioView from '../views/PerfilUsuarioView.vue'

const routes = [
  {path: '/',redirect: '/login'},
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/actividades',
    name: 'Actividades',
    component: ActividadView
  },
  {
    path: '/evaluaciones',
    name: 'Evaluaciones',
    component: EvaluacionView
  },
  {
    path: '/incidencias',
    name: 'Incidencias',
    component: IncidenciaView
  },
  {
    path: '/inscripciones',
    name: 'Inscripciones',
    component: IncripcionView
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: PerfilUsuarioView
  },
  {
    path: '/proyectos',
    name: 'Proyectos',
    component: () => import('../views/ProyectoView.vue')
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: () => import('../views/RegistroUsuarioView.vue')
  },
  {
    path: '/tutorias',
    name: 'Tutorias',
    component: () => import('../views/TutoriaView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard para proteger rutas que no son públicas (login)
router.beforeEach((to, _from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('logueado') === 'true'

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})

export default router
