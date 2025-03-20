

export abstract class BaseException extends Error {

    abstract getHttpCode(): number;
}
