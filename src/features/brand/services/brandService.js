import instance from "../../../core/utils/axiosInterceptors";

export default class BrandService {
    getAll(page = 0, pageSize = 10) {
        return instance.get(`Brands?Page=${page}&PageSize=${pageSize}`)
    }
    delete(id) {
        return instance.delete(`Brands/${id}`)
    }
}