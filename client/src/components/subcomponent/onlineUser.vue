<template>
    <div class="online-user">
        <ul>
            <li v-for="onlineUser in onlineUserList">
                <div class="online-user-link">
                    <div class="online-user-message">
                        <div class="online-user-avatar">
                            <n-avatar size="small" :src="onlineUser.avatar" />
                        </div>
                        <div class="online-user-content">
                            <div class="online-user-name">
                                <span>{{ onlineUser.username }}</span>
                            </div>
                            <n-popover trigger="click" placement="left">
                                <template #trigger>
                                    <n-button ghost type="info" size="tiny">
                                        查看信息
                                    </n-button>
                                </template>
                                <p>艾特: @{{ onlineUser.username }}</p>
                                <p>邮箱: {{ onlineUser.email }}</p>
                            </n-popover>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { NAvatar, NButton, NPopover } from "naive-ui";
export default {
    components: {
        NAvatar,
        NButton,
        NPopover
    },
    props: {
        onlineUserList: Array
    },
}
</script>

<style>
.n-popover {
    border-radius: 8px;
    background-color: red;
}

.online-user-message {
    display: flex;
    background-color: #FFFFFF;
    margin: 10px;
    border-radius: 8px;
}

.online-user-avatar {
    margin: 10px;
}

.online-user-avatar img {
    display: block;
}

.n-avatar {
    display: block;
}

.online-user-content {
    margin: auto 0;
    display: flex;
}


.online-user-name {
    width: 80px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #409EFF;
}

.n-button {
    margin: 0 10px;
}
</style>