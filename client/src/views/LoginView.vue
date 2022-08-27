<template>
  <div class="login">
    <login-form />
  </div>
</template>

<script>
// @ is an alias to /src
import loginForm from '@/components/loginForm.vue'
export default {
  name: 'LoginView',
  components: {
    loginForm
  }
}
</script>

<style>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
