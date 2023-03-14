// Tüm yapıyı configure edip react tarafından kullanıma hazır hale getirmek..
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

//TODO: use not deprecated function.

const middlewares = [thunk];

// boilerplate code
const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(rootReducer, enhancer);
export function configureStore() {
    // 1 instance
    return store;
}
export default store;