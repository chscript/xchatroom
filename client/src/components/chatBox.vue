<template>
    <div class="chat">
        <div class="chat-title">
            <n-gradient-text :size="28" style="background-color: #95ec69;">
                MeChat ｜
            </n-gradient-text>
            <n-gradient-text :size="24" style="background-color: #95ec69;">
                新的朋友，新的交互
            </n-gradient-text>
        </div>
        <div class="chat-content">
            <div class="msg">
                <div class="msg-show" ref="defaultScroll" style="flex: 2; background-color: #EBEEF5;">
                    <chat-message :chatMessageList="chatMessageList" />
                </div>
                <div class="msg-input" style="flex: 1; background-color: #ffffff;">
                    <chat-input @handleInput="fatherHandleInput" />
                </div>
            </div>
            <div class="info">
                <n-gradient-text :size="16" style="color: #409EFF;">
                    个人信息
                </n-gradient-text>
                <hr>
                <div class="info-user" style="flex: 1; background-color: #EBEEF5; margin: 0 0 18px;">
                    <info-message :user="user" />
                </div>
                <n-gradient-text :size="16" style="color: #409EFF;">
                    其他在线人员
                </n-gradient-text>
                <hr>
                <div class="info-online" style="flex: 1; background-color: #EBEEF5;">
                    <online-user :onlineUserList="onlineUserList" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { NGradientText } from "naive-ui";
import { debounce } from "lodash"
import chatInput from "./subcomponent/chatInput.vue"
import chatMessage from "./subcomponent/chatMessage.vue";
import infoMessage from "./subcomponent/infoMessage.vue";
import onlineUser from "./subcomponent/onlineUser.vue";
import ChatInput from "./subcomponent/chatInput.vue";
import socket from "@/utils/socket.js";
import store from "@/store";
export default {
    components: {
        NGradientText,
        chatInput,
        chatMessage,
        infoMessage,
        onlineUser,
        ChatInput
    },
    methods: {
        fatherHandleInput: debounce(function (content) {
            if (content !== null && content !== "" && !((/(^\s)/).test(content))) {
                let data = {
                    username: this.user.username,
                    avatar: this.user.avatar,
                    content: content,
                    type: 0 //1代表别人，0代表自己
                }
                store.commit("updateChatMessageList", data);
                socket.emit("chat message", data);
            }
        }, 500),
    },
    mounted() {
        socket.on("chat message", data => {
            if (this.user.username !== data.username) { //如果消息是其他用户发的则更新
                data.type = 1;
                store.commit("updateChatMessageList", data);
            }
            this.$nextTick(() => {
                this.$refs.defaultScroll.scrollTop = this.$refs.defaultScroll.scrollHeight;
            });
        });
        socket.on("chat online", data => {
            let index = data.findIndex(i => i.username === this.user.username);
            data.splice(index, 1);
            store.commit("updateOnlineUserList", data);
        });
    },
    computed: {
        user() {
            return store.state.user;
        },
        chatMessageList() {
            return store.state.chatMessageList;
        },
        onlineUserList() {
            return store.state.onlineUserList;
        }
    },
    watch: {
        $route(to, from) {
            if (to.path === "/login") {
                socket.close();
                window.location.reload();
                localStorage.removeItem("token");
            }
        },
    }
}
</script>
<style>
.info>hr {
    border: 2px solid #409EFF;
}

ul>li {
    list-style: none;
}

.chat-title {
    padding: 0 18px;
    background-color: #ffffff;
    border-radius: 15px 15px 0 0;
}

.chat-content {
    width: 750px;
    height: 500px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    border-radius: 0 0 15px 15px;
}

.msg {
    flex: 2;
    margin: 5px 18px 18px 18px;
    display: flex;
    flex-direction: column;
}

.msg-show {
    overflow: auto;
}

.info-online {
    overflow: auto;
}

.info-user {
    overflow: auto;
}

.msg-input {
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.info {
    flex: 1;
    margin: 5px 18px 18px 0;
    display: flex;
    flex-direction: column;
}

.info .n-gradient-text {
    text-align: center;
}
</style>