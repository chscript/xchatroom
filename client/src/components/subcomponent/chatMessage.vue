<template>
    <div class="chat-message">
        <ul>
            <li v-for="msg in chatMessageList">
                <div v-if="msg.type === 1" class="news-receive">
                    <div class="avatar-receive avatar-size">
                        <n-avatar size="small" :src="msg.avatar" />
                    </div>
                    <div class="content">
                        <div class="username"><span>{{ msg.username }}</span></div>
                        <div class="message">
                            <!-- <span></span> -->
                            <p>{{ msg.content }}</p>
                        </div>
                    </div>
                </div>
                <div v-else="msg.type === 0" class="news-send">
                    <div class="avatar-send avatar-size">
                        <n-avatar size="small" :src="msg.avatar" />
                    </div>
                    <div class="content">
                        <div class="message">
                            <!-- <span></span> -->
                            <p>{{ msg.content }}</p>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { NAvatar } from "naive-ui";
export default {
    components: {
        NAvatar
    },
    props: {
        chatMessageList: Array
    },
}
</script>
<style>
.chat-message {
    margin: 5px 0;
}

.content {
    padding: 5px 0;
}

.username {
    margin: 0 16px;
}

.message {
    max-width: 230px;
    background-color: #FFFFFF;
    display: inline-block;
    word-wrap: break-word;
    padding: 8px 12px;
    margin: 0px 16px;
    position: relative;
    border-radius: 8px;
}

.news-receive {
    display: flex;
}

.avatar-receive {
    height: 0px;
    margin: 25px 0 0 10px;
}

/* .news-receive .content .message span {
    position: absolute;
    top: 8px;
    left: -16px;
    width: 0px;
    height: 0px;
    line-height: 0px;
    font-size: 0px;
    border: 8px solid transparent;
    border-right-color: #FFFFFF;
} */

.news-send {
    display: flex;
    flex-direction: row-reverse;
}

.avatar-send {
    height: 0px;
    margin: 10px 10px 0 0;
}

.news-send .content .message {
    background-color: #95ec69;
}

/* .news-send .content .message span {
    position: absolute;
    top: 8px;
    right: -16px;
    width: 0px;
    height: 0px;
    line-height: 0px;
    font-size: 0px;
    border: 8px solid transparent;
    border-left-color: #95ec69;
} */
</style>