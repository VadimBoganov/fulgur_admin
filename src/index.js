import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from "./components/App/App"
import { Provider } from 'react-redux';
import { store } from './app/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App/>
  </Provider>
);
