//* React application entry point
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home/home'
import { Provider } from 'react-redux';  
import { store } from './redux';

ReactDOM.render(
	<Provider store={store}>
		<Home/>
	</Provider>,
	document.getElementById('appContainer')
);