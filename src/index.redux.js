const ADD = 'add';
const REMOVE = 'remove';
export function counter(state, actions) {
  switch (actions.type) {
    case ADD:
      return state + 1;
    case REMOVE:
      return state - 1;
    default:
      return 10;
  }
}

export function addCount() {
  return {
    type: ADD
  }
}
export function removeCount() {
  return {
    type: REMOVE
  }
}
export function addCountAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(addCount());
    }, 1000);
  }
}
