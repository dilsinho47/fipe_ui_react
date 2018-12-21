import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { addNewMessage, favoriteSaved } from '../actions';
import CarService from 'services/CarService';
import FavoriteService from 'services/FavoriteService';
import 'css/App.css';

// props: user, userHash, addNewMessage, onFavoriteUpdated
class SearchForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleBrandChange = this.handleBrandChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);

    this.state = {
      brands: [],
      models: [],
      years: [],
      price: null,
      selectedBrandId: 0,
      selectedModelId: 0,
      selectedYearId: 0,
      isLoading: false,
    };

    this.carService = new CarService(this.props.user, this.props.userHash);
  }

  async componentDidMount() {
    try {
      const brands = await this.carService.getCars();
      this.setState({ brands });
    } catch (err) {
      this.setState({ brands: null });
      this.handleError(err);
    }
  }

  async requestModels(brandId) {
    let models = [];
    if (brandId) {
      try {
        models = await this.carService.getModels(brandId);
      } catch (err) {
        models = null;
        this.handleError(err);
      }
    }
    return models;
  }

  async requestYears(brandId, modelId) {
    let years = [];
    if (brandId && modelId) {
      try {
        years = await this.carService.getYears(brandId, modelId);
      } catch (err) {
        years = null;
        this.handleError(err);
      }
    }
    return years;
  }

  async requestPrice(brandId, modelId, yearId) {
    let price = null;
    if (brandId && modelId && yearId) {
      try {
        price = await this.carService.getPrice(brandId, modelId, yearId);
      } catch (err) {
        this.handleError(err);
      }
    }
    return price;
  }

  async handleBrandChange(event) {
    if (!this.state.isLoading) {
      let newBrandId = parseInt(event.target.value, 10);
      this.setState({ selectedBrandId: newBrandId, models: [], selectedModelId: 0, years: [], selectedYearId: 0, isLoading: true, price: null });

      const models = await this.requestModels(newBrandId);
      this.setState({ models: models, isLoading: false });
    }
  }

  async handleModelChange(event) {
    if (!this.state.isLoading) {
      let newModelId = parseInt(event.target.value, 10);
      this.setState({ selectedModelId: newModelId, years: [], selectedYearId: 0, isLoading: true, price: null });

      const years = await this.requestYears(this.state.selectedBrandId, newModelId);
      this.setState({ years: years, isLoading: false });
    }
  }

  async handleYearChange(event) {
    if (!this.state.isLoading) {
      let newYearId = event.target.value;
      this.setState({ selectedYearId: newYearId, isLoading: true, price: null });

      const price = await this.requestPrice(this.state.selectedBrandId, this.state.selectedModelId, newYearId);
      this.setState({ price: price, isLoading: false });
    }
  }

  async onClickSave() {

    if (this.props.user && this.state.selectedBrandId && this.state.selectedModelId && this.state.selectedYearId && !this.state.isLoading) {
      try {
        const favoriteService = new FavoriteService(this.props.user, this.props.userHash);
        await favoriteService.saveFavorite(this.state.selectedBrandId, this.state.selectedModelId, this.state.selectedYearId);
        this.props.favoriteSaved(this.props.user, this.props.userHash);
      } catch (err) {
        if (err.statusCode === 409) { // Conflict
          this.props.addNewMessage({ type: 'warning', text: 'The selected car is already in your favorite list.' });
        } else {
          this.handleError(err);
        }
        return;
      }

      this.props.addNewMessage({ type: 'success', text: 'Favorite added.' });
    }
  }

  getDefaultOption(value = 0) {
    return (<MenuItem value={value} key={value}>Please select...</MenuItem>);
  }

  handleError(err) {
    if (err.statusCode === 401) {
      this.props.addNewMessage({ type: 'error', text: 'Authentication error. Please login.' });
    } else if (err.statusCode === 404) {
      this.props.addNewMessage({ type: 'warning', text: 'No element found' });
    } else {
      this.props.addNewMessage({ type: 'error', text: 'Could not communicate to the server. Please try again later.' });
    }
  }

  render() {
    let brandOptions;
    if (this.state.brands) {
      brandOptions = this.state.brands.map(element =>
        <MenuItem value={element.id} key={element.id}>{element.brand}</MenuItem>
      );
    }
    let modelOptions;
    if (this.state.models) {
      modelOptions = this.state.models.map(element =>
        <MenuItem value={element.id} key={element.id}>{element.model}</MenuItem>
      );
    }
    let yearOptions;
    if (this.state.years) {
      yearOptions = this.state.years.map(element =>
        <MenuItem value={element.id} key={element.id}>{element.year}</MenuItem>
      );
    }

    return (
      <div className="searchPage">
        <h1>Select car...</h1>
        <form className="searchForm">
          <FormControl>
            <InputLabel>Brands</InputLabel>
            <Select value={this.state.selectedBrandId} onChange={this.handleBrandChange}>
              {this.getDefaultOption()}
              {brandOptions}
            </Select>
          </FormControl>
          <br />
          {this.state.selectedBrandId && this.state.models && this.state.models.length > 0 ? (
            <FormControl>
              <InputLabel>Models</InputLabel>
              <Select value={this.state.selectedModelId} onChange={this.handleModelChange}>
                {this.getDefaultOption()}
                {modelOptions}
              </Select>
            </FormControl>
          ) : null}
          <br />
          {this.state.selectedModelId && this.state.years && this.state.years.length > 0 ? (
            <FormControl>
              <InputLabel>Years</InputLabel>
              <Select value={this.state.selectedYearId} onChange={this.handleYearChange}>
                {this.getDefaultOption()}
                {yearOptions}
              </Select>
            </FormControl>
          ) : null}
        </form>
        {this.state.price &&
          <div>
            <h2>Current price: {this.state.price}</h2>
            <Button variant="contained" color="primary" onClick={this.onClickSave} >Save</Button>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.username,
  userHash: state.user.hash,
})

const mapDispatchToProps = dispatch => ({
  addNewMessage: (msg) => dispatch(addNewMessage(msg)),
  favoriteSaved: (user, userHash) => dispatch(favoriteSaved(user, userHash)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);