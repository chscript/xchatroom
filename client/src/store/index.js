import { createStore } from 'vuex'

export default createStore({
  state: {

    user: {
      email: '',
      avatar: '',
      username: ''
    }, //用户信息
    onlineUserList: [],
    chatMessageList: [], //聊天信息

  },
  getters: {
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
    },
    updateOnlineUserList(state, data) {
      state.onlineUserList = data;
    },
    updateChatMessageList(state, data) {
      state.chatMessageList.push(data);
    },
  },
  actions: {
  },
  modules: {
  }
})
