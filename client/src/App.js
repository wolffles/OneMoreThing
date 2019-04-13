import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

// import Navbar from './components/layout/Navbar';
// import Footer from './components/layout/Footer';
// import Landing from './components/layout/Landing';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/* <Navbar /> */}
          {/* <Route exact path='/' component={Landing}/> */}
          {/* we put all other components in container because landing is the only component taht takes up the whole screen */}
          <div className="container">
          <h1>hello</h1>
            {/* <Route exact path='/register'/>
            <Route exact path='/login' /> */}
          </div>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
