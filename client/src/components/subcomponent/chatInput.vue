<template>

    <n-input v-model:value="newContent" ref="newStatus" placeholder="请输入内容" type="textarea" :autosize="{
        minRows: 3,
        maxRows: 3
    }" style="background-color: #EBEEF5; height: 95px; margin: 18px 0;" />
    <n-button strong secondary type="primary" @click="handleInput" block style="margin: auto 0 0">
        发送</n-button>
</template>
<script>
import { NButton, NInput } from "naive-ui";
export default {
    components: {
        NButton, NInput
    },
    emits: ["handleInput"],
    data() {
        return {
            newContent: "",
        }
    },
    methods: {
        handleInput() {
            this.$emit("handleInput", this.newContent);
            this.newContent = "";
        },
    },
}
</script>
<style>
</style>