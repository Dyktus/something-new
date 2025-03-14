export class BadRequestException extends Error {
    public readonly HTTP_CODE = 400;
    public msg: string;

    public constructor(msg: string) {
        super();
        this.msg = msg;
    }
}
