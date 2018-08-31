const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const userRouter = require('./user');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const model = require('./model');
const User = model.getModelName('users');
const Chat = model.getModelName('chats');

io.on('connection', function (socket) {
  console.log('用户连接了');
  socket.on('sendMsg', function (data) {
    const { from, to, msg } = data;
    const chatid = [from, to].sort().join('_');
    Chat.create({ from, to, content: msg, chatid, create_time: new Date().getTime() }, (err, doc) => {
      if (!err) {
        io.emit('receiveMsg', { data: doc })
      }
    })
  })
})

app.use(express.static(path.resolve(__dirname,'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use((req, res, next)=> {
  if(req.url.startsWith('/user')||req.url.startsWith('/static')) {
    return next();
  }
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.use('/user', userRouter);


server.listen(9090, () => {
  console.log('server run at 9090');
}); 