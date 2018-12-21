import request from 'request-promise';
import * as Constants from '../constants.js';

class UserService {
  static async loginOrSignup(isLoginOrSignup, username, password) {
    const hash = await request({
      method: 'POST',
      url: Constants.DOMAIN + (isLoginOrSignup ? Constants.LOGIN_API : Constants.SIGNUP_API),
      body: JSON.stringify({ username, password }),
      headers: {
        'content-type': 'application/json',
      }
    });

    return hash;
  }
}

export const login = (username, password) => UserService.loginOrSignup(true, username, password);
export const signup = (username, password) => UserService.loginOrSignup(false, username, password);