import instance from "../../../core/utils/axiosInterceptors";

export default class CarService {
    getAll(page = 0, pageSize = 10) {
        return instance.get(`Cars?Page=${page}&PageSize=${pageSize}`)
    }

    add(car) {
        return instance.post("Cars", car);
    }
}