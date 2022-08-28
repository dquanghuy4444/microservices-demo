import { Response } from 'express';

// Helper code for the API consumer to understand the error and handle is accordingly
export enum ENUM_STATUS_CODE {
    SUCCESS = 200,
    FAILURE = 400,
    INVALID_ACCESS_TOKEN = 401,
    RETRY = 1000,
    EMAIL_NOT_VERIFY = 1001
}

export enum ENUM_RESPONSE_STATUS {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500
}
abstract class ApiResponse {
    constructor(
        protected code: ENUM_STATUS_CODE,
        protected status: ENUM_RESPONSE_STATUS,
        protected message: string
    ) { }

    protected prepare<T extends ApiResponse>(
        res: Response,
        response: T
    ): Response {
        return res.status(this.status).json(ApiResponse.sanitize(response));
    }

    public send(res: Response): Response {
        return this.prepare<ApiResponse>(res, this);
    }

    private static sanitize<T extends ApiResponse>(response: T): T {
        const clone: T = {} as T;
        Object.assign(clone, response);
        // @ts-ignore
        delete clone.status;
        for (const i in clone)
            if (typeof clone[i] === 'undefined') delete clone[i];
        return clone;
    }
}

export class AuthFailureResponse extends ApiResponse {
    constructor(message = 'Authentication Failure') {
        super(ENUM_STATUS_CODE.FAILURE, ENUM_RESPONSE_STATUS.UNAUTHORIZED, message);
    }
}

export class NotFoundResponse extends ApiResponse {
    private url: string | undefined;

    constructor(message = 'Not Found') {
        super(ENUM_STATUS_CODE.FAILURE, ENUM_RESPONSE_STATUS.NOT_FOUND, message);
    }

    send(res: Response): Response {
        this.url = res.req?.originalUrl;
        return super.prepare<NotFoundResponse>(res, this);
    }
}

export class ForbiddenResponse extends ApiResponse {
    constructor(message = 'Forbidden') {
        super(ENUM_STATUS_CODE.FAILURE, ENUM_RESPONSE_STATUS.FORBIDDEN, message);
    }
}

export class BadRequestResponse extends ApiResponse {
    constructor(message = 'Bad Parameters') {
        super(ENUM_STATUS_CODE.FAILURE, ENUM_RESPONSE_STATUS.BAD_REQUEST, message);
    }
}

export class InternalErrorResponse extends ApiResponse {
    constructor(message = 'Internal Error') {
        super(ENUM_STATUS_CODE.FAILURE, ENUM_RESPONSE_STATUS.INTERNAL_ERROR, message);
    }
}

export class SuccessMsgResponse extends ApiResponse {
    constructor(message: string) {
        super(ENUM_STATUS_CODE.SUCCESS, ENUM_RESPONSE_STATUS.SUCCESS, message);
    }
}

export class FailureMsgResponse extends ApiResponse {
    constructor(message: string) {
        super(ENUM_STATUS_CODE.FAILURE, ENUM_RESPONSE_STATUS.SUCCESS, message);
    }
}

export class SuccessResponse<T> extends ApiResponse {
    constructor(private data: T, message = "success") {
        super(ENUM_STATUS_CODE.SUCCESS, ENUM_RESPONSE_STATUS.SUCCESS, message);
    }

    send(res: Response): Response {
        return super.prepare<SuccessResponse<T>>(res, this);
    }
}

export class RedirectResponse<T> extends ApiResponse {
    private route: string;
    constructor(route: string) {
        super(ENUM_STATUS_CODE.SUCCESS, ENUM_RESPONSE_STATUS.SUCCESS, 'Redirect');
        this.route = route;
    }

    redirect(res: Response) {
        res.redirect(this.route);
    }
}

export class AccessTokenErrorResponse extends ApiResponse {
    private instruction = 'refresh_token';

    constructor(message = 'Access token invalid') {
        super(
            ENUM_STATUS_CODE.INVALID_ACCESS_TOKEN,
            ENUM_RESPONSE_STATUS.UNAUTHORIZED,
            message
        );
    }

    send(res: Response): Response {
        res.setHeader('instruction', this.instruction);
        return super.prepare<AccessTokenErrorResponse>(res, this);
    }
}

export class TokenRefreshResponse extends ApiResponse {
    constructor(
        message: string,
        private accessToken: string,
        private refreshToken: string
    ) {
        super(ENUM_STATUS_CODE.SUCCESS, ENUM_RESPONSE_STATUS.SUCCESS, message);
    }

    send(res: Response): Response {
        return super.prepare<TokenRefreshResponse>(res, this);
    }
}
export class EmailNotVerifyResponse extends ApiResponse {
    constructor(message = 'Email not verify') {
        super(ENUM_STATUS_CODE.EMAIL_NOT_VERIFY, ENUM_RESPONSE_STATUS.BAD_REQUEST, message);
    }
}
