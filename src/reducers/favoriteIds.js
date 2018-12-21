import { FETCH_FAVORITEIDS_SUCCEEDED } from '../actions';

function favoriteIds(state = [], action) {
    switch (action.type) {
        case FETCH_FAVORITEIDS_SUCCEEDED:
          return action.favoriteIds;
        default:
          return state;
    }
}

export default favoriteIds;