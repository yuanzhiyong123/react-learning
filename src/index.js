import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducer';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Login from './Login';
import Page from './Page';

const store = createStore(reducers, applyMiddleware(thunk));

function Test() {
  return <div>404</div>
}
ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/page' component={Page} />
        <Route path='/:id' component={Test} />
      </Switch>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));