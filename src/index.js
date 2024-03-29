import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
import { HashRouter as Router } from 'react-router-dom';

import { store } from './redux/store.js';
import App from './components/app/app.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
