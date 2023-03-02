import { carState } from "../initialValues/carState";
import { GET_ALL_CARS } from '../constants/carConstants'
export default function carReducer(state = carState, { type, payload }) {
    switch (type) {
        case GET_ALL_CARS:
            return payload;
        default:
            return state;
    }
}