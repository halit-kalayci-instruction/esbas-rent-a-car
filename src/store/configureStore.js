// Tüm yapıyı configure edip react tarafından kullanıma hazır hale getirmek..
import { createStore } from 'redux';
import rootReducer from './rootReducer';

//TODO: use not deprecated function.
export function configureStore() {
    return createStore(rootReducer);
}
