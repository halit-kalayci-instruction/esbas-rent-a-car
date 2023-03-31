// Tüm yapıyı configure edip react tarafından kullanıma hazır hale getirmek..
import { compose, applyMiddleware } from 'redux';
import { configureStore } from "@reduxjs/toolkit"
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';


const middlewares = [thunk];

// boilerplate code
const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const store = configureStore({ reducer: rootReducer, enhancer });
export function getStore() {
    // 1 instance
    return store;
}
export default store;