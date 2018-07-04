import Login from "./login";

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT'

export function user(state = { isLogin: false, username: 'xiaoming' }, actions) {
  switch (actions.stype) {
    case LOGIN:
      return { ...state, isLogin: true };
    case LOGOUT:
      return { ...state, isLogin: false };
    default:
      return state;
  }
}

export function login() {
  return {type: LOGIN};
}
export function logout() {
  return {type: LOGOUT};
}