import CarService from "../../features/car/services/carService";
import { GET_ALL_CARS } from "../constants/carConstants";

export function getAllCars(cars) {
    return {
        type: GET_ALL_CARS,
        payload: cars
    }
}

//TODO: Redux ile async işlemler
// thunk redux-thunk
export function getAllCarsAsync() {
    // async
    return async function (dispatch) {
        let carService = new CarService();
        let result = await carService.getAll();
        dispatch(getAllCars(result.data));
    }
}