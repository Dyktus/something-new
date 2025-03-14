export class UnauthorizedException extends Error {
    public readonly HTTP_CODE = 401;
    public msg: string;

    public constructor(msg: string) {
        super();
        this.msg = msg;
    }
}
