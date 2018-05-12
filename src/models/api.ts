export class BaseResponse {
    static OK = 200;
    static MH402 = 'MH402';
    static MH403 = 'MH403';
    static MH408 = 'MH408';
    static MH409 = 'MH409';
    static MH410 = 410;
    static MH503 = 'MH503';
    static MH_OFFLINE = 'MH601';

    status: number;
    message?: string;

    constructor(status?: string, message?: string) {
        // this.status = status;
        this.message = message;
    }

    ok(): boolean {
        return this.status === BaseResponse.OK;
    }

    isVersionUpdate(): boolean {
        return this.status === BaseResponse.MH410;
    }
}
