import instance from "../../../core/utils/axiosInterceptors";

export default class CarService {
    getAll(page = 0, pageSize = 10) {
        return instance.get(`Cars?Page=${page}&PageSize=${pageSize}`, { headers: { "X-Disable-Interceptor": "true" } })
    }

    getById(id) {
        return instance.get("Cars/" + id);
    }

    add(car) {
        return instance.post("Cars", car);
    }

    update(car) {
        return instance.put("Cars", car);
    }

    delete(id) {
        return instance.delete("Cars/" + id);
    }
}