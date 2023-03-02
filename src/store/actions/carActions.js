import { GET_ALL_CARS } from "../constants/carConstants";

export function getAllCars(cars) {
    return {
        type: GET_ALL_CARS,
        payload: cars
    }
}

//TODO: Redux ile async işlemler