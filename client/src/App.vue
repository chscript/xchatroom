<template>
  <n-message-provider>
    <router-view :key="key" />
    <!-- <LoginView /> -->
  </n-message-provider>
</template>
<script>
import { NMessageProvider } from 'naive-ui';
import { LoginView } from '@/views/LoginView.vue'
export default {
  components: {
    NMessageProvider,
    LoginView,
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + new Date()
        : this.$route + new Date();
    }
  }
}
</script>
<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

body {
  background-color: #EBEEF5;
}
</style>
