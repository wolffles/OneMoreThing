import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PostForm from './components/post/PostForm';
import EditPost from './components/post/EditPost';
import CreateProfile from './components/create-profile/CreateProfile';
import Feed from './components/feed/Feed';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route exact path='/' component={Landing}/>
            {/* we put all other components in container because landing is the only component taht takes up the whole screen */}
            <div className="container">
              <Route exact path='/register' component={Register}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/feed' component={Feed}/>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/post' component={PostForm}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path='/edit-post' component={EditPost}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
