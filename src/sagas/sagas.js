import { all } from 'redux-saga/effects'
import watchLogin from './login'
import logger from './logger'
import favoriteIds from './favoriteIds';

export default function* sagas() {
  yield all([
    logger(),
    watchLogin(),
    favoriteIds(),
  ])
}