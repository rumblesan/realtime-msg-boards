
interface ReqwestOptions {
    url: string;
    method?: string;
    data?: Object;
    contentType?: string;
    headers?: Object;
    type?: boolean;
    crossOrigin?: boolean;
    withCredentials?: boolean;
    jsonpCallback?: string;
    jsonpCallbackName?: string;
    error?: (err: Object) => void;
    success?: (resp: Object) => void;
    complete?: (resp: Object) => void;
}

declare function reqwest(
    url: string,
    cb: (resp: Object) => void
): void;

declare function reqwest(options: ReqwestOptions): void;

