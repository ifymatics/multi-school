import { CustomError } from "./custorm-error";

export class UnathorizedError extends CustomError {
    statusCode = 403;
    constructor(message = "Unauthorized request") {
        super(message);
        Object.setPrototypeOf(this, UnathorizedError.prototype)
    }
    serializeError() {
        return [{ message: this.message }];
    }
}