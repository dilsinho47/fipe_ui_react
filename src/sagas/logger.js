import { take, select } from 'redux-saga/effects'

function* watchAndLog() {
  while (true) {
    const action = yield take('*');
    const state = yield select();

    console.group(`${action.type} action`);
    console.log(action);
    console.log('state after', state);
    console.groupEnd();
  }
}

export default watchAndLog;