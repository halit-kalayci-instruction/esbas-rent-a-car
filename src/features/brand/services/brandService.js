import instance from "../../../core/utils/axiosInterceptors";

export default class BrandService {
    getAll(page = 0, pageSize = 10) {
        return instance.get(`Brands?Page=${page}&PageSize=${pageSize}`)
    }
    delete(id) {
        return instance.delete(`Brands/${id}`)
    }
    add(brand) {
        return instance.post("Brands", brand);
    }
    update(brand) {
        return instance.put("Brands", brand);
    }
}