import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'
import thunk from 'redux-thunk';
import mixpanel from 'mixpanel-browser'
import MixpanelMiddleware from 'redux-mixpanel-middleware'
import './index.css';
import App from './App';

const t = process.env.MP_CHANNEL_SURF

mixpanel.init(t)
const mixpanelMiddleware = new MixpanelMiddleware(mixpanel)


const store = createStore(rootReducer, applyMiddleware(thunk, mixpanelMiddleware))
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)