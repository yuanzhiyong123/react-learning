import axios from 'axios';
import io from 'socket.io-client';
const socket = io.connect('ws://localhost:9090');

const MSG_LIST = 'MSG_LIST';
const MSG_RECEIVE = 'MSG_RECEIVE';
const MSG_READ = 'MSG_READ';

const initState = {
  msgList: [],
  users: {},
  unRead: 0
};
export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return { ...state, users: action.payload.users, msgList: action.payload.msg, unRead: action.payload.msg.filter(v => !v.read && v.to == action.payload.userId).length };
    case MSG_RECEIVE:
      const num = action.payload.to === action.userId ? 1 : 0;
      return { ...state, msgList: [...state.msgList, action.payload], unRead: state.unRead + num };
    case MSG_READ:
      return {
        ...state, msgList: state.msgList.map(v => {
          if (v.to === action.payload.userId && v.from === action.payload.from) {
            v.read = true;
            return v;
          }
          return v;
        }), unRead: state.unRead - action.payload.num
      }
    default:
      return state;
  }
}

export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/msglist').then(res => {
      if (res.data.code === 0) {
        const userId = getState().user._id;
        dispatch({
          type: MSG_LIST,
          payload: { msg: res.data.data, users: res.data.users, userId }
        });
      }
    });
  }
}

export function readMsg(from) {
  return (dispatch, getState) => {
    const userId = getState().user._id;
    axios.post('/user/msgread', { from }).then(res => {
      if (res.data.code === 0) {
        dispatch({
          type: MSG_READ,
          payload: { from, userId, num: res.data.num }
        });
      }
    });
  }
}

export function sendMsg(data) {
  return dispatch => {
    socket.emit('sendMsg', data);
  }
}

export function receiveMsg() {
  return (dispatch, getState) => {
    socket.on('receiveMsg', data => {
      dispatch({
        type: MSG_RECEIVE,
        payload: data.data,
        userId: getState().user._id
      });
    });
  }
}