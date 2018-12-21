import { LOGIN_SUCCEEDED } from '../actions';

function user(state = 
  { 
    username : '',
    hash : '',
  }, action) {
    switch (action.type) {
        case LOGIN_SUCCEEDED:
          const { username, hash } = action;
          return { ...state, username, hash };
        default:
          return state;
    }
}

export default user;