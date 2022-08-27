<template>
  <div class="chat">
    <chat-box />
  </div>
</template>

<script>
import chatBox from '@/components/chatBox.vue'
export default {
  name: 'HomeView',
  components: {
    chatBox,
  }
}
</script>

<style>
.chat {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
