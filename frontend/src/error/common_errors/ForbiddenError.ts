import ApiError from "../ApiError";

class ForbiddenError extends ApiError {
    static {
        this.prototype.name = "ForbiddenError";
    }
    constructor(message: string) {
        super(message, "FORBIDDEN", 403);
    }
}

export default ForbiddenError;
