<template>
    <div class="info-message">
        <div class="info-message-top">
            <div class="info-message-avatar">
                <n-avatar size="small" :src="user.avatar" />
            </div>
            <div class="info-message-content">
                <div class="info-message-name">{{ user.username }}</div>
            </div>
        </div>
        <div class="info-message-list">
            <ul>
                <ul>
                    <li>
                        <a href="#">
                            <n-icon size="20">
                                <PersonOutline />
                            </n-icon>
                            <p>用户信息</p>
                        </a>
                    </li>

                    <li><a href="#">
                            <n-icon size="20">
                                <PeopleOutline />
                            </n-icon>
                            <p>我的好友</p>
                        </a>
                    </li>

                    <li><a href="#" @click="handleLoginOut">
                            <n-icon size="20">
                                <LogOutOutline />
                            </n-icon>
                            <p>退出登录</p>
                        </a>
                    </li>
                </ul>
            </ul>
        </div>
    </div>
</template>
<script>
import { NAvatar, NButton, NIcon } from "naive-ui";
import { PersonOutline, PeopleOutline, LogOutOutline } from "@vicons/ionicons5";
import socket from "@/utils/socket.js";
export default {
    components: {
        NButton,
        NAvatar,
        NIcon,
        PersonOutline,
        PeopleOutline,
        LogOutOutline
    },
    props: {
        user: Object
    },
    methods: {
        handleLoginOut() {
            socket.close();
            window.location.reload();
            localStorage.removeItem("token");
            this.$router.push({ path: "/login" });
        }
    }
}

</script>
<style>
.info-message-top {
    display: flex;
    background-color: #FFFFFF;
    border-radius: 8px;
}

.info-message-avatar {
    margin: 10px;
}

.info-message-avatar img {
    display: block;
}

.info-message-content {
    margin: auto 0;
}

.info-message-name {
    display: block;
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.info-message {
    padding: 8px;
}

.info-message-list {
    border-radius: 8px;
    background-color: #FFFFFF;
}

.info-message-list ul {
    margin: 8px 0 0 0;
}

.info-message-list ul>li {
    padding: 10px;

}

.info-message-list ul>li a {
    text-decoration: none;
    color: inherit;
    padding: 0px;
    display: flex;
}

.info-message-list ul>li a:hover {
    color: #409EFF;
}

.info-message-list ul>li a p {
    margin: auto 10px;
}
</style>