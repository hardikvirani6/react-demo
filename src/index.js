import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from '@reduxjs/toolkit'
import { PersistGate } from 'redux-persist/integration/react'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import rootReducer from "./store/store";

const persistConfig = {
    key: 'root',
    storage,
    // blacklist: 'home'
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer)
let persistor = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
