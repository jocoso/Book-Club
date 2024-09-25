import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';
import BookClubList from './components/BookClubList';
import Reviews from './components/Reviews';
import UserProfile from './components/UserProfile';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      {/* Add the routing below the header */}
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/book-clubs" component={BookClubList} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/user-profile" component={UserProfile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
