import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home';
import List from './Components/List';
import Account from './Components/List';
import Profile from './Components/Perfil';
import Ranking from './Components/Ranking';
import Game from './Components/Game';

class App extends Component {
  render() {
    const App = () => (
      <div id="main">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/list' component={List}/>
          <Route path='/profile' component={Profile}/>
          <Route path='/ranking' component={Ranking}/>
          <Route path='/game' component={Game}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;