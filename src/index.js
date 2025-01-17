import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import App from './App';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path={'/'} component={App} />
      <Route exact path={`/admin`} component={App} />
    </div>
  </Router>,
  document.getElementById('root')
);
