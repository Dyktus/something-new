import { BaseException } from "./BaseException";

export class UnauthorizedException extends BaseException {
    public readonly HTTP_CODE = 401;
    public msg: string;

    public constructor(msg: string) {
        super();
        this.msg = msg;
    }

    public getHttpCode() {
        return 401;
    }
}
