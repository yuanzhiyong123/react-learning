import axios from 'axios';
import io from 'socket.io-client';
const socket = io.connect('ws://localhost:9090');

const MSG_LIST = 'MSG_LIST';
const MSG_RECEIVE = 'MSG_RECEIVE';

const MSG_READ = 'MSG_READ';

const initState = {
  msgList: [],
  unRead: 0
};
export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return { ...state, msgList: action.payload, unRead: action.payload.filter(v=>!v.read).length };
      case MSG_RECEIVE:
      console.log('触发了');
      return { ...state, msgList: [...state.msgList, action.payload], unRead: state.unRead+1};
    default:
      return state;
  }
}

export function getMsgList() {
  return dispatch => {
    axios.get('/user/msglist').then(res => {
      if (res.data.code === 0) {
        dispatch({
          type: MSG_LIST,
          payload: res.data.data
        });
      }
    });
  }
}

export function sendMsg(data) {
  return dispatch=> {
    socket.emit('sendMsg', data);
  }
}

export function receiveMsg() {
  return dispatch=> {
    socket.on('receiveMsg', data=> {
      dispatch({
        type: MSG_RECEIVE,
        payload: data.data
      });
    });
  }
}