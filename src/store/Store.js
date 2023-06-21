/**
 * Store.js
 * Esse arquivo configura como é feito a base de dado (armazenamento) pelo redux e as técnicas de persistência de dados.
 */

// Imports básicos
import { applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

// Imports de persistência
import { persistStore, persistReducer } from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

// Backend de armazenamento
import AsyncStorage from "@react-native-async-storage/async-storage";

// Nossos reducers
import rootReducer from "../redux/reducers";

// Configuração
const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    stateReconciler: hardSet,
    // blacklist: ["usuario"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux Store e Persistor
export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk],
});

export const persistor = persistStore(store);

// Deleta o cache
persistor.purge();
