import React, { Component } from 'react';
import 'css/App.css';
import SearchForm from './SearchForm.js';
import MessageBar from './MessageBar.js';
import FavoriteBar from './FavoriteBar.js';
import LoginPage from './LoginPage.js';
import { addNewMessage } from '../actions';
import { connect } from 'react-redux'

class App extends Component {

  render() {
    return (
      <div className="app">
        {!this.props.user ? (
          <LoginPage />
        ) : (
            <div className="app-elements">
              <SearchForm />
              <FavoriteBar />
            </div>
          )
        }
        <MessageBar />
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
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
