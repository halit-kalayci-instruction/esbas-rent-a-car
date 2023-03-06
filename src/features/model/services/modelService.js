import instance from "../../../core/utils/axiosInterceptors";

export default class ModelService {
    getAll(page = 0, pageSize = 20) {
        return instance.get(`Models?Page=${page}&PageSize=${pageSize}`)
    }
}