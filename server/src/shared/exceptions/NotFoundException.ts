export class NotFoundException extends Error {
    public readonly HTTP_CODE = 404;
    public msg: string;

    public constructor(msg: string) {
        super();
        this.msg = msg;
    }
}
