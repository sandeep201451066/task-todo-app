import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { createStore } from 'redux';
import reducer from './redux';
import { Provider } from 'react-redux';
export const store = createStore(reducer);

// import './components/style.css';
ReactDOM.render(<Provider store={store}>
    <App></App>
</Provider>, document.getElementById('root'));
serviceWorker.unregister();
