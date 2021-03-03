import React, { Component } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Header from './Components/Header.js';
import Home from './Home/Home.js';
import TodosListPage from './TodosListPage/TodosListPage';
import LoginPage from './AuthPages/LoginPage';
import SignUpPage from './AuthPages/SignUpPage';
import { getUserFromLocalStorage, putUserInLocalStorage } from './local-storage-utils.js';
import PrivateRoute from './Components/PrivateRoute.js';


export default class App extends Component {
  state = {
    user: getUserFromLocalStorage()
  }

  handleUserChange = (user) => {
    this.setState({ user })
    putUserInLocalStorage(user);
  }
  handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }
  render() {

    return (
      <div>
        <Router>
          <Header user={this.state.user} handleLogout={this.handleLogout} />
          <Switch>
            <Route
              path="/"
              exact
              render={(routerProps) => <Home {...routerProps} />}
            />
            <PrivateRoute
              path="/todos"
              exact
              token={this.state.user && this.state.user.token}
              render={(routerProps) => <TodosListPage user={this.state.user} {...routerProps} />}
            />
            <Route
              path="/login"
              exact
              render={(routerProps) => <LoginPage handleUserChange={this.handleUserChange} {...routerProps} />}
            />
            <Route
              path="/signup"
              exact
              render={(routerProps) => <SignUpPage handleUserChange={this.handleUserChange} {...routerProps} />}
            />
          </Switch>
        </Router>

      </div>
    )
  }
}
