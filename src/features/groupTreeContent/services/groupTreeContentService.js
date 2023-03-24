import instance from "../../../core/utils/axiosInterceptors";

export class GroupTreeContentService {
    getAll() {
        return instance.get("GroupTreeContents/GetAll");
    }
}