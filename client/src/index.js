import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers/index'
import thunk from 'redux-thunk';
import mixpanel from 'mixpanel-browser'
import MixpanelMiddleware from 'redux-mixpanel-middleware'
import './index.css'
import App from './App'
import dotenv from 'dotenv'


dotenv.config()

const t = process.env.REACT_APP_MP_CHANNEL_SURF

mixpanel.init(t)
const mixpanelMiddleware = new MixpanelMiddleware(mixpanel)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, mixpanelMiddleware)))
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)