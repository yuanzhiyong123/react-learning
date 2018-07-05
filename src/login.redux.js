const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export function user(state = { isLogin: false, username: 'zhiyong' }, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLogin: true };
    case LOGOUT:
      return { ...state, isLogin: false };
    default:
      return state;
  }
}

export function login() {
  return {type:LOGIN};
}
export function logout() {
  return {type:LOGOUT};
}