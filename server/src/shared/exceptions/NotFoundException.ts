import {BaseException} from "./BaseException";

export class NotFoundException extends BaseException {
    public readonly HTTP_CODE = 404;
    public msg: string;

    public constructor(msg: string) {
        super();
        this.msg = msg;
    }

    public getHttpCode() {
        return 404;
    }
}
