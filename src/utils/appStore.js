// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./cartSlice"
// const appStore=configureStore({
//     reducer:{
//     cart:cartReducer
//     },
    
// });
// export default appStore;


import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import cartReducer from './cartSlice';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], // only persist cart slice
};

const rootReducer = combineReducers({
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
