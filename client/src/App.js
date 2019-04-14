import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login'
import Register from './components/auth/Register'

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
              <Route exact path='/register' component={Login}/>
              <Route exact path='/login' component={Register}/>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
