import React from 'react';
import App from './App';
import { Switch, Route, Link } from 'react-router-dom';

function Home() {
  return <div>home</div>
}
export default class Page extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to='/page/'>首页</Link>
          </li>
          <li>
            <Link to='/page/home'>home</Link>
          </li>
        </ul>
        <Switch>
          <Route path={'/page/'} exact component={App} />
          <Route path={'/page/home'} exact component={Home} />
        </Switch>
      </div>
    )
  }
};