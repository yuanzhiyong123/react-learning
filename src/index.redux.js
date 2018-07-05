const ADD_GUN = 'ADD';
const REMOVE_GUN = 'REMOVE'
//reducer
export function counter(state = 10, action) {
  switch (action.type) {
    case ADD_GUN:
      return state + 1;
    case REMOVE_GUN:
      return state - 1;
    default:
      return state;
  }
}
//create reducer

export function addGun() {
  return {
    type: ADD_GUN
  }
}
export function removeGun() {
  return {
    type: REMOVE_GUN
  }
}
export function addGunAsync() {
  return dispatch=> {
    setTimeout(()=>{
      dispatch(addGun());
    },1000);
  }
}
