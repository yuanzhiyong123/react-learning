import axios from 'axios';

const GETLIST_SUCCESS = 'GETLIST_SUCCESS';


const initState = {
  userList: []
};
export function chatuser(state = initState, action) {
  switch (action.type) {
    case GETLIST_SUCCESS:
      return {...state,userList: action.payload }
    default:
      return state; 
  }
}

export function getList(type) {
  return dispatch => {
    axios.get('/user/list?type=' + type).then(res => {
      // console.log(res);
      if (res.data.code === 0) {
        dispatch({ type: GETLIST_SUCCESS, payload: res.data.data })
      }
    })
  }
}