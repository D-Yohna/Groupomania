import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/combinator'

//Dev Tool
import logger from 'redux-logger'

const store = createStore(
  rootReducer, applyMiddleware(thunk, logger)
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <App />
    </Provider>,
  </React.StrictMode>
);