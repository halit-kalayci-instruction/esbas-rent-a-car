// Tüm depoların birleştiği ana depo.
import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import carReducer from './reducers/carReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    car: carReducer
})

export default rootReducer;