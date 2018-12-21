import {NEW_MESSAGE, CLOSE_MESSAGE} from '../actions';

function message(state = 
  { 
    type : 'default', 
    text : '',
    open : false,
  }, action) {
    switch (action.type) {
        case NEW_MESSAGE:
          return { ...state, ...action.message, open : true };
        case CLOSE_MESSAGE:
          return { ...state, open : false };
        default:
          return state;
    }
}

export default message;