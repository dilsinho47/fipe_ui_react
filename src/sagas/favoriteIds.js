import { put, take, call } from 'redux-saga/effects'
import FavoriteService from 'services/FavoriteService.js'
import { LOGIN_SUCCEEDED, FAVORITE_SAVED, addNewMessage, fetchFavoriteIdsSucceeded, fetchFavoriteIdsFailed } from 'actions.js'

function* watchAndFetch() {
  while (true) {
    const {username, hash} = yield take([LOGIN_SUCCEEDED, FAVORITE_SAVED]);
    if (username && hash) {
      yield call(getFavoriteIds, username, hash);
    }
  }
}

function* getFavoriteIds(username, hash) {
  let favoriteIds;
  try {
    const service = new FavoriteService(username, hash);
    favoriteIds = yield call(service.getFavoriteIds);
    yield put(fetchFavoriteIdsSucceeded(favoriteIds));
  } catch (error) {
    yield put(fetchFavoriteIdsFailed(error));
    if (error.statusCode !== 404) {
      yield put(addNewMessage({ type: 'error', text: 'Internal server error.' }));
    }
  }
  return favoriteIds;
}

export default watchAndFetch;