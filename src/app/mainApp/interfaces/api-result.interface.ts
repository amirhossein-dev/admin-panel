export interface IApiResult<T> {
    businessErrors: BusinessError[];
    result: T;
    relatedLinks: any;
    trace: Trace[];
    traceNO: number;
}

export interface BusinessError {
    code: string;
    message: string;
}
export interface Trace {
    responseTime: string;
    dataTokenTest: string;
}
