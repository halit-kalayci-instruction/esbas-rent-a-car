import instance from "../../../core/utils/axiosInterceptors";

export default class CarService {
    getAll(page = 0, pageSize = 10) {
        return instance.get(`Cars?Page=${page}&PageSize=${pageSize}`, { headers: { "X-Disable-Interceptor": "true" } })
    }

    getAllDynamic(pageInfo, dynamic) {
        debugger;
        const { page = 0, pageSize = 10 } = pageInfo;
        return instance.post(`Cars/GetList/ByDynamic?Page=${page}&PageSize=${pageSize}`, dynamic)
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