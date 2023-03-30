import { CustomError } from "./custorm-error";

export class InternalServerError extends CustomError {
    statusCode = 500;
    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, InternalServerError.prototype);
        //console.log("HERE")
    }
    serializeError() {
        return [{ message: this.message }]
    }
}