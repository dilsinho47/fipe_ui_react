import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import { addNewMessage } from '../actions';
import 'css/App.css';
import CarService from '../services/CarService.js';

// props: user, userHash, addNewMessage, favoriteIds
class FavoriteBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      favorites: [],
      isLoading: false,
    };

    this.carService = new CarService(this.props.user, this.props.userHash);
  }

  async getFavorites(ids) {
    let favorites = [];
    for (let id of ids) {
      let favorite = await this.getFavorite(id);
      favorites.push(favorite);
    }
    return favorites;
  }

  async getFavorite(id) {
    await this.sleep(1000);
    let favorite;
    try {
      favorite = await this.requestCar(id);
      if (favorite) {
        favorite.id = id;
      }
    } catch (err) {
      this.props.addNewMessage({ type: 'error', text: 'Could not load all favorites. Please try again later.' });
      await this.sleep(3000);
    }
    return favorite;
  }

  async requestCar(id) {
    let car;
    try {
      car = await this.carService.getCar(id);
    } catch (err) {
      return null;
    }
    return car;
  }

  sleep(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.isLoading) {
      return;
    }

    let newIds = this.props.favoriteIds.map(favoriteId => favoriteId.id);
    let previousIds = prevProps.favoriteIds.map(favoriteId => favoriteId.id);

    let idsToAdd = newIds.filter(favoriteId => !previousIds.includes(favoriteId));
    let idsToRemove = previousIds.filter(favoriteId => !newIds.includes(favoriteId));

    if (idsToAdd.length || idsToRemove.length) {

      this.setState({ isLoading: true });
      let newFavorites = [...this.state.favorites];

      // remove favorites
      newFavorites = newFavorites.filter(favorite => {
        if (favorite && favorite.id) {
          return !idsToRemove.includes(favorite.id);
        }
        return false;
      });

      // add favorites
      const favoritesToAdd = await this.getFavorites(idsToAdd);
      newFavorites.push(...favoritesToAdd);

      this.setState({ favorites: newFavorites, isLoading: false });
    }
  }

  render() {
    let rows;
    if (this.state.favorites) {
      rows = this.state.favorites.map((favorite) => {
        if (favorite) {
          return (
            <TableRow key={favorite.id}>
              <TableCell>{favorite.brand}</TableCell>
              <TableCell>{favorite.model}</TableCell>
              <TableCell>{favorite.year}</TableCell>
              <TableCell>{favorite.price}</TableCell>
            </TableRow>
          );
        } else {
          return null;
        }
      });
    }

    return (
      <div className="favoriteBar">
        <h1>My favorite cars {this.state.isLoading ? '(loading...)' : null}</h1>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Brand</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.username,
  userHash: state.user.hash,
  favoriteIds: state.favoriteIds,
})

const mapDispatchToProps = dispatch => ({
  addNewMessage: (msg) => dispatch(addNewMessage(msg)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteBar);