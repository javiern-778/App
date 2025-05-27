<template>
  <div class="container mt-4">
    <h1 class="mb-4">Gestión de Tutorías</h1>
    <TutoriaForm />
    <hr />
    <TutoriaList />
  </div>
</template>

<script>
import TutoriaForm from '@/components/TutoriaForm.vue'
import TutoriaList from '@/components/TutoriaList.vue'

export default {
  components: {
    TutoriaForm,
    TutoriaList
  }
}
</script>
