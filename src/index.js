import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducer';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './config';
import './index.css'
import Login from './page/login/login';
import Register from './page/register/register';
import AuthRouter from './components/authrouter/authrouter'
import BossInfo from './page/boss-info/boss-info';
import GeniusInfo from './page/genius-info/genius-info';
import PageContainer from './components/page-container/page-container';
import Chat from './page/chat/chat';


const store = createStore(reducers, applyMiddleware(thunk));

function Home () {
  return (
    <div>
      <Redirect to='/login' />
    </div>
  )
}
ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <div>
        <AuthRouter />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login'  component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/bossinfo' component={BossInfo} />
          <Route path='/geniusinfo' component={GeniusInfo} />
          <Route path='/chat/:id' component={Chat} />
          <Route component={PageContainer} />
        </Switch>
      </div>
    </HashRouter>
  </Provider>
), document.getElementById('root'));