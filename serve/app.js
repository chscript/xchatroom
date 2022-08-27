const routes = require('./router');
const mongo = require('./utils/mongo');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const { expressjwt: jwt } = require('express-jwt');
const express = require('express');
const app = new express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//静态资源访问
app.use(express.static(path.join(__dirname, 'public')));
//中间件
app.use(jwt({
  secret: "rule", algorithms: ["HS256"]
}).unless({ path: ["/user/login", "/user/register", "/user/verify_email", "/user/modify_pwd"] }),
  (err, req, res, next) => {
    if (err) {
      res.json({
        code: 401,
        msg: err.message,
      })
    }
  }
)

let onlineUserList = []; //存放线上人数

io.on('connection', socket => {

  socket.on('chat login', user => {
    socket.username = user.username;
    console.log("用户登录:", socket.username);
    let index = onlineUserList.findIndex(i => i.username === user.username);
    if (index === -1) {
      onlineUserList.push(user); //将用户放入在线列表
    }
    io.emit('chat online', onlineUserList);
  })

  //聊天信息
  socket.on('chat message', data => {
    io.emit('chat message', data); //聊天消息广播
  })

  socket.on('disconnect', () => {
    let index = onlineUserList.findIndex(i => i.username === socket.username);
    if (index !== -1) {
      onlineUserList.splice(index, 1);
      socket.name = '';
      io.emit('chat online', onlineUserList);
      console.log("用户退出:", socket.username);
    }
  })
})

mongo(app);
routes(app);
// 服务端监听5000端口
server.listen(5000, () => {
  console.log("Server running at http://localhost:5000/");
})

module.exports = app;