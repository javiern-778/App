<template>
  <div>
    <RegistroUsuarioForm />
    <RegistroUsuarioList />
  </div>
</template>

<script>
import RegistroUsuarioForm from '../components/RegistroUsuarioForm.vue';
import RegistroUsuarioList from '../components/RegistroUsuarioList.vue';

export default {
  components: {
    RegistroUsuarioForm,
    RegistroUsuarioList,
  },
};
</script>
