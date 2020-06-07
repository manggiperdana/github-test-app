import React from 'react';
import {Switch, Route} from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import Notfound from './pages/NotFound';
import Detail from './pages/Detail';

export default function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/profile/:username" exact component={Profile} />
      <Route path="/detail/:username/:repo" exact component={Detail} />
      <Route component={Notfound} />
    </Switch>
  );
}