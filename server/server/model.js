const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/react-chat';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', () => {
  console.log('数据库连接成功');
});

const models = {
  users: {
    username: { type: String, require: true },
    password: { type: String, require: true },
    type: { type: String, require: true },
    avatar: { type: String },  //头像
    desc: { type: String },  //简介
    title: { type: String },  //职位
    company: { type: String }, //公司名称
    money: { type: String }  //工资
  },
  chats: {
    'chatid': { type: String, require: true },
    'from': { type: String, require: true },
    'to': { type: String, require: true },
    'read': { type: Boolean, default: false },
    'content': { type: String, require: true, default: '' },
    'create_time': { type: Number, default: new Date().getTime() }
  }
}

for (let name in models) {
  mongoose.model(name, new mongoose.Schema(models[name]));
}

module.exports = {
  getModelName(name) {
    return mongoose.model(name);
  }
}