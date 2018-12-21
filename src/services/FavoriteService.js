import request from 'request-promise';
import * as Constants from '../constants.js';

export default class FavoriteService {
  constructor(username, hash) {
    this.username = username;
    this.hash = hash;
    this.requestHeaders =  {
      'X-USERNAME': this.username,
      'X-HASH': this.hash,
      'content-type': 'application/json',
    };
  }

  getFavoriteIds = async () => {
    let favoriteIds = JSON.parse(await request({
      url: Constants.DOMAIN + Constants.FAVORITES_API + '/' + this.username,
      headers: this.requestHeaders,
    }));

    favoriteIds.forEach(favoriteId => {
      favoriteId.id = '/' + favoriteId.brand_id + '/' + favoriteId.model_id + '/' + favoriteId.year_id;
    });

    return favoriteIds;
  }

  saveFavorite = async (brandId, modelId, yearId) => {
    const json = JSON.stringify({
      username: this.username,
      brand_id: brandId,
      model_id: modelId,
      year_id: yearId,
    });

    await request({
      method: 'POST',
      body: json,
      url: Constants.DOMAIN + Constants.FAVORITES_API,
      headers: this.requestHeaders,
    });
  }
}