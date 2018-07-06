import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducer';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import './config';
import Login from './page/login/login';
import Register from './page/register/register';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </div>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));