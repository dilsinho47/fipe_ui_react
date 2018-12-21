import { put, take, call } from 'redux-saga/effects'
import * as UserService from 'services/UserService.js'
import { LOGIN_REQUEST, SIGNUP_REQUEST, loginFailed, loginSucceeded, addNewMessage } from 'actions.js'

function* login() {
  while (true) {
    const {type, username, password} = yield take([LOGIN_REQUEST, SIGNUP_REQUEST]);

    try {
      const hash = yield call(type === SIGNUP_REQUEST ? UserService.signup : UserService.login, username, password);
      if (hash) {
        yield put(loginSucceeded(username, hash));
      }
    } catch (error) {
      yield put(loginFailed(error));

      if (type === LOGIN_REQUEST) {
        if (error.statusCode === 404) {
          yield put(addNewMessage({ type: 'error', text: 'Username is not valid.' }));
        } else if (error.statusCode === 401) {
          yield put(addNewMessage({ type: 'error', text: 'Wrong password.' }));
        } else {
          yield put(addNewMessage({ type: 'error', text: 'Unexpected error.' }));
        }
      } else {
        if (error.statusCode === 400) {
          yield put(addNewMessage({ type: 'error', text: 'Please insert username with at least 6 characters and maximum of 19 characters.' }));
        } else if (error.statusCode === 409) {
          yield put(addNewMessage({ type: 'error', text: 'This username is already used.' }));
        } else {
          yield put(addNewMessage({ type: 'error', text: 'Unexpected error.' }));
        }
      }
    }
  }
}

export default login;