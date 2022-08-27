<template>
  <n-card title="MeChat" style="width: 400px;">
    <n-tabs default-value="signin" size="large" justify-content="space-evenly">
      <n-tab-pane name="signin" tab="登录">
        <n-form ref="loginFormRef" :model="loginInfo" :rules="rules">
          <n-form-item-row label="账号" name="account" path="account">
            <n-input v-model:value="loginInfo.account" placeholder="请输入用户名或邮箱" />
          </n-form-item-row>
          <n-form-item-row label="密码" name="password" path="password">
            <n-input v-model:value="loginInfo.password" type="password" show-password-on="mousedown"
              placeholder="请输入密码" />
          </n-form-item-row>
        </n-form>
        <n-button type="primary" @click="handleLogin" block secondary strong>
          登录
        </n-button>
      </n-tab-pane>
      <n-tab-pane name="signup" tab="注册">
        <n-form ref="registerFormRef" :model="registerInfo" :rules="rules">
          <n-form-item-row label="用户名" name="username" path="username">
            <n-input v-model:value="registerInfo.username" placeholder="请输入用户名" />
          </n-form-item-row>
          <n-form-item-row label="密码" name="password" path="password">
            <n-input v-model:value="registerInfo.password" type="password" show-password-on="mousedown"
              placeholder="请输入密码" />
          </n-form-item-row>
          <n-form-item-row label="邮箱" name="email" path="email">
            <n-input v-model:value="registerInfo.email" placeholder="请输入邮箱" />
          </n-form-item-row>
          <n-form-item-row label="验证码" name="verifycode" path="verifycode">
            <n-input v-model:value="registerInfo.verifycode" placeholder="请输入验证码" />
          </n-form-item-row>
        </n-form>
        <n-button type="primary" @click="handleVerifyCode" block secondary strong>
          发送验证码
        </n-button><br>
        <n-button type="primary" @click="handleRegister" block secondary strong>
          注册
        </n-button>
      </n-tab-pane>
      <n-tab-pane name="f_pwd" tab="忘记密码">
        <n-form ref="forgetFormRef" :model="forgetInfo" :rules="rules">
          <n-form-item-row label="邮箱" name="email" path="email">
            <n-input v-model:value="forgetInfo.email" placeholder="请输入邮箱" />
          </n-form-item-row>
          <n-form-item-row label="新的密码" name="password" path="password">
            <n-input v-model:value="forgetInfo.password" type="password" show-password-on="mousedown"
              placeholder="请输入密码" />
          </n-form-item-row>
          <n-form-item-row label="验证码" name="verifycode" path="verifycode">
            <n-input v-model:value="forgetInfo.verifycode" placeholder="请输入验证码" />
          </n-form-item-row>
        </n-form>
        <n-button type="primary" @click="handleVerifyCode" block secondary strong>
          发送验证码
        </n-button><br>
        <n-button type="primary" @click="handleForget" block secondary strong>
          修改密码
        </n-button>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router"
import { useMessage, NCard, NTabs, NTabPane, NForm, NFormItemRow, NInput, NButton } from "naive-ui"
import { login, register, v_email, f_pwd } from "@/http/api/user"
import socket from "@/utils/socket.js"
import { useStore } from "vuex";
export default defineComponent({
  components: {
    NCard,
    NTabs,
    NTabPane,
    NForm,
    NFormItemRow,
    NInput,
    NButton
  },
  setup() {
    const message = useMessage();
    const router = useRouter();
    const store = useStore();

    const loginFormRef = ref(null);
    const registerFormRef = ref(null);
    const forgetFormRef = ref(null);

    const loginInfo = reactive({
      account: "",
      password: "",
    });

    const registerInfo = reactive({
      username: "",
      password: "",
      email: "",
      verifycode: "",
    });

    const forgetInfo = reactive({
      email: "",
      password: "",
      verifycode: "",
    });

    const rules = {
      account: {
        required: true,
        trigger: "blur",
        validator: (rule, value) => {
          return new Promise((resolve, reject) => {
            if (!(value)) {
              reject(Error("请输入账号或邮箱"));
            } else {
              resolve();
            }
          })
        },
      },
      username: {
        required: true,
        trigger: "blur",
        validator: (rule, value) => {
          return new Promise((resolve, reject) => {
            if (!(value)) {
              reject(Error("请输入用户名"));
            } else if (0) { //可放入正则表达式进行格式匹配
              reject(Error("e"));
            } else {
              resolve();
            }
          })
        },
      },
      password: {
        required: true,
        trigger: "blur",
        validator: (rule, value) => {
          return new Promise((resolve, reject) => {
            if (!(value)) {
              reject(Error("请输入密码"));
            } else if (0) { //可放入正则表达式进行格式匹配
              reject(Error("e"));
            } else {
              resolve();
            }
          })
        },
      },
      email: {
        required: true,
        trigger: "blur",
        validator: (rule, value) => {
          return new Promise((resolve, reject) => {
            if (!(value)) {
              reject(Error("请输入邮箱"));
            } else if (!(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(value)) {
              reject(Error("邮箱格式不正确"));
            } else {
              resolve();
            }
          })
        },
      },
      verifycode: {
        required: true,
        trigger: "blur",
        validator: (rule, value) => {
          return new Promise((resolve, reject) => {
            if (!(value)) {
              reject(Error("请输入验证码"));
            } else if (!(/^[1-9]\d*$/).test(value)) {
              reject(Error("验证码格式不正确"));
            } else {
              resolve();
            }
          })
        },
      },
    };

    let handleLogin = () => {
      loginFormRef.value?.validate(async (errors) => {
        if (!errors) {
          const params = loginInfo;
          const res = await login(params);
          if ((res) && res["code"] == 1) {

            message.success(res["msg"]);
            console.log(res);

            socket.connect();
            socket.emit("chat login", res["data"]);
            store.commit("setUser", res["data"]);
            localStorage.setItem("token", res["token"]);

            router.push({ path: "/" })
          } else if ((res) && res["code"] == 0) {
            message.error(res["msg"]);
          }
        }
      }).catch((e) => { message.error("登录失败"); });
    };

    let handleRegister = () => {
      registerFormRef.value?.validate(async (errors) => {
        if (!errors) {
          const params = registerInfo;
          const res = await register(params);
          if ((res) && res["code"] == 1) {
            message.success(res["msg"]);
          } else if ((res) && res["code"] == 0) {
            message.error(res["msg"]);
          }
        }
      }).catch((e) => { message.error("注册失败"); });
    };

    let handleForget = () => {
      forgetFormRef.value?.validate(async (errors) => {
        if (!errors) {
          const params = forgetInfo;
          const res = await f_pwd(params);
          if ((res) && res["code"] == 1) {
            message.success(res["msg"]);
          } else if ((res) && res["code"] == 0) {
            message.error(res["msg"]);
          }
        }
      }).catch((e) => { message.error("密码修改失败"); });
    };

    let handleVerifyCode = async () => {
      let params = !(forgetInfo.email) ? registerInfo.email : forgetInfo.email;
      let res = await v_email({ email: params });
      if ((res) && res["code"] == 1) {
        message.success(res["msg"]);
      } else if ((res) && res["code"] == 0) {
        message.error(res["msg"]);
      }
    };

    return {
      loginFormRef,
      registerFormRef,
      forgetFormRef,
      loginInfo,
      registerInfo,
      forgetInfo,
      rules,
      handleLogin,
      handleRegister,
      handleForget,
      handleVerifyCode,
    }

  }
});
</script>