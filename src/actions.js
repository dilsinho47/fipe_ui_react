export const NEW_MESSAGE = 'NEW_MESSAGE';
export const CLOSE_MESSAGE = 'CLOSE_MESSAGE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';
export const SIGNUP_SUCCEEDED = 'SIGNUP_SUCCEEDED';
export const FETCH_FAVORITEIDS_SUCCEEDED = 'FETCH_FAVORITEIDS_SUCCEEDED';
export const FETCH_FAVORITEIDS_FAILED = 'FETCH_FAVORITEIDS_FAILED';
export const FAVORITE_SAVED = 'FAVORITE_SAVED';

export function addNewMessage(message) {
  return { type : NEW_MESSAGE, message };
}

export function closeMessage() {
  return { type : CLOSE_MESSAGE };
}

export function loginRequest(username, password) {
  return { type: LOGIN_REQUEST, username, password};
}

export function signupRequest(username, password) {
  return { type: SIGNUP_REQUEST, username, password};
}

export function loginFailed(error) {
  return { type : LOGIN_FAILED, error };
}

export function loginSucceeded(username, hash) {
  return { type : LOGIN_SUCCEEDED, username, hash };
}

export function fetchFavoriteIdsSucceeded(favoriteIds) {
  return { type: FETCH_FAVORITEIDS_SUCCEEDED, favoriteIds };
}

export function fetchFavoriteIdsFailed(error) {
  return { type: FETCH_FAVORITEIDS_FAILED, error };
}

export function favoriteSaved(username, hash) {
  return { type: FAVORITE_SAVED, username, hash };
}
