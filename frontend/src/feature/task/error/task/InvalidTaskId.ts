import ApiError from "@/error/ApiError";

class InvalidTaskId extends ApiError {
    static {
        this.prototype.name = "InvalidTaskId";
    }
}

export default InvalidTaskId;