import { CustomError } from "./custorm-error";

export class BadRequestError extends CustomError {
    statusCode = 400;

    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeError() {
        return [{ message: this.message }];
    }
}
