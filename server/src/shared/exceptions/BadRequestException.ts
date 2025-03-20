import {BaseException} from "./BaseException";

export class BadRequestException extends BaseException {
    public readonly HTTP_CODE = 400;
    public msg: string;

    public constructor(msg: string) {
        super();
        this.msg = msg;
    }

    public getHttpCode() {
        return 400;
    }
}
