import message from './message';
import user from './user';
import favoriteIds from './favoriteIds';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  message, 
  user, 
  favoriteIds,
});

export default reducer;