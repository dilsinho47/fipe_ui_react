import request from 'request-promise';
import * as Constants from '../constants.js';

export default class CarService {
  constructor(username, hash) {
    this.username = username;
    this.hash = hash;
    this.requestHeaders =  {
      'X-USERNAME': this.username,
      'X-HASH': this.hash,
      'content-type': 'application/json',
    };
  }

  async getCars() {
    const cars = JSON.parse( await request({
      url: Constants.DOMAIN + Constants.CARS_API,
      headers: this.requestHeaders,
    }));
    return cars;
  }

  async getModels(brandId) {
    const models = JSON.parse( await request({
      url: Constants.DOMAIN + Constants.CARS_API + '/' + brandId, 
      headers: this.requestHeaders,
    }));
    return models;
  }

  async getYears(brandId, modelId) {
    const years = JSON.parse( await request({
      url: Constants.DOMAIN + Constants.CARS_API + '/' + brandId + '/' + modelId,
      headers: this.requestHeaders,
    }));
    return years;
  }

  async getPrice(brandId, modelId, yearId) {
    const car = JSON.parse(await request({
      url: Constants.DOMAIN + Constants.CARS_API + '/' + brandId + '/' + modelId + '/' + yearId,
      headers: this.requestHeaders,
    }));
    return car.price;
  }

  async getCar(id) {
    const car = JSON.parse( await request({
      url: Constants.DOMAIN + Constants.CARS_API + id,
      headers: this.requestHeaders,
    }));
    return car;
  }

}