import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import "semantic-ui-css/semantic.min.css";
import './App.css';
import { Container } from 'semantic-ui-react';
// import Main from './pages/Main';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Container>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
