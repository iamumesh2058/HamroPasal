import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../src/styles/style.scss";

import { Provider } from "react-redux";
import store from "./store/Store.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<App />
			<ToastContainer autoClose={500} position="top-center" />
		</Provider>
	</StrictMode>,
)
