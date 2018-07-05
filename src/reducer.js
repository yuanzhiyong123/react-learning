import {counter} from './index.redux';
import {user} from './login.redux';
import {combineReducers} from 'redux';
export default combineReducers({counter, user})

