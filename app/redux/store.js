// import {createStore, applyMiddleware, compose} from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers/index';

// // import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';
// //import FilesytemStorage from "redux-persist-filesystem-storage";
// import {persistStore, persistReducer} from 'redux-persist';

// const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// // const configureStore = () => {
// //   return createStore(rootReducer, composeEnchancer(applyMiddleware(thunk)));
// // };

// const persistConfig = {
//   key: 'async',
//   storage: '',
//   timeout: 0,
//   whitelist: [''],
// };

// const initialState = {};

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(
//   persistedReducer,
//   initialState,
//   composeEnchancer(applyMiddleware(thunk)),
// );

// let persistor = persistStore(store);

// //export default configureStore;

// export default {
//   store,
//   persistor,
// };

// export {store, persistor};

import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index.js';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 0,
  whitelist: ['user', 'communities'],
};

const initialState = {};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  initialState,
  composeEnchancer(applyMiddleware(thunk)),
);

let persistor = persistStore(store);

export default {store, persistor};
export {store, persistor};
