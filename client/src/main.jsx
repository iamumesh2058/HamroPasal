import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.scss';

import store from './Store/Store.jsx';
import { Provider } from "react-redux";

import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
			<ToastContainer autoClose={500} position='top-center'/>
		</Provider>
	</React.StrictMode>,
);