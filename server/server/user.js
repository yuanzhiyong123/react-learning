const express = require('express');
const router = express.Router();
const model = require('./model');
const User = model.getModelName('users');
const Chat = model.getModelName('chats');



router.get('/info', (req, res) => {
  const username = req.cookies.userid;
  if (!username) {
    return res.send({ code: 1 });
  }
  User.findOne({ _id: username }, { password: 0 }, (err, doc) => {
    if (err) {
      return res.send({ code: 1, msg: '后台错误' });
    }
    return res.send({ code: 0, data: doc });
  });
});

router.post('/msgread', (req, res) => {
  const userId = req.cookies.userid;
  const { from } = req.body;
  Chat.update({ from, to: userId }, { '$set': { read: true } }, { multi: true }, (err, doc) => {
    if (err) {
      return res.send({
        code: 1,
        msg: '后台错误'
      });
    }
    return res.send({
      code: 0,
      num: doc.nModified
    });
  })
});
router.get('/msglist', (req, res) => {
  const username = req.cookies.userid;
  User.find({}, (e, d) => {
    let users = {};
    d.forEach(v => {
      users[v._id] = { username: v.username, avatar: v.avatar }
    });
    Chat.find({ '$or': [{ from: username, }, { to: username }] }, (err, doc) => {
      if (err) {
        return res.send({ code: 1, msg: '后台错误' });
      }
      res.send({
        code: 0,
        data: doc,
        users
      });
    });
  });
});

router.post('/update', (req, res) => {
  const username = req.cookies.userid;
  if (!username) {
    return res.send({ code: 1, msg: '用户未登录' });
  }
  User.findOneAndUpdate({ _id: username }, req.body, { new: true, fields: { password: 0, __v: 0 } }, (err, doc) => {
    if (err) {
      return res.send({ code: 1, msg: '后台错误' });
    }
    res.send({ code: 0, data: doc });
  });
});

router.get('/list', (req, res) => {
  const { type } = req.query;
  User.find({ type }, { password: 0 }, function (err, data) {
    if (err) {
      return res.send({ code: 1, msg: '后台错误' });
    }
    res.send({
      code: 0,
      data
    });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, data) => {
    if (!data) {
      res.send({
        code: 1, msg: '用户名不存在'
      });
    } else {
      if (data.password !== password) {
        res.send({ code: 1, msg: '密码错误' });
      } else {
        res.cookie('userid', data._id); //设置cookie
        let obj = JSON.parse(JSON.stringify(data));
        delete obj.password;  //删除返回结果中的用户密码
        res.send({
          code: 0,
          data: obj,
          msg: '登陆成功'
        })
      }
    }
  });
});
router.post('/register', (req, res) => {
  const { username, password, type } = req.body;
  User.findOne({ username }, (err, data) => {
    if (err) {
      return res.send({ code: 1, msg: '后端出错了' });
    }
    if (data) {
      return res.send({ code: 1, msg: '用户名已经存在' });
    }
    User.create({ username, password, type }, (e, d) => {
      if (e) {
        return res.send({ code: 1, msg: '后端出错了' });
      }

      res.cookie('userid', d._id); //设置cookie
      return res.send({ code: 0, msg: '注册成功' });
    })
  });
});

module.exports = router;