import { Config, Header } from 'ionic-angular';
import { Observable } from 'rxjs';
import 'rxjs/operator/map';
import { Injectable, Injector } from '@angular/core';
import {
    Http,
    Headers,
    RequestOptions,
    Response,
    Request,
    ResponseContentType,
    RequestMethod
} from '@angular/http';
import { BaseResponse, User } from '../models'
import { Store } from '@ngrx/store';
import { IAppState } from '../reducers';
import { AuthService } from './auth.service';
import * as moment from 'moment';
import { LoadingService } from './loader.service';
import { GeneralActions } from '../actions';
export class RequestInfo {
    method?: string;
    url: string;
    pathParams?: Object;
    params?: Object;
    body?: Object;
    headers?: Object;
    canHandleErrors?: boolean
}
export const HEADE_USER_ID = 'x-user-id';
export const HEADE_TOKEN = 'Authorization';
export const HEADE_LANGUAGE = 'x-language';
export const HEADE_APP_VERSION = 'x-mh-version';
export const HEADER_TIMEZONE = 'x-mh-timezone';
@Injectable()
export class MainService {
    public httpObj: Http;
    public loaderObj: LoadingService
    public configObj: Config;
    private store: Store<IAppState>;
    public auth: AuthService;
    private genActs: GeneralActions;
    private access_token_fromStore: string;
    constructor(http: Http, config: Config, loader: LoadingService, auth: AuthService, injector: Injector) {
        this.httpObj = http;
        this.configObj = config;
        this.store = injector.get(Store) as any;
        this.genActs = injector.get(GeneralActions);
        this.loaderObj = loader;
        this.wrapResponse = this
            .wrapResponse
            .bind(this);
    }

    getBaseUrl(): string {
        return this
            .configObj
            .get('api_base');
    }

    deviceHasValidDate(respDate: string): boolean {
        let duration = moment.duration(moment(new Date(respDate)).diff(moment()));
        return Math.abs(duration.asMinutes()) <= 2;
    }
    /**
     * Handles Network occurred while making API call to the server.
     */
    handleError(resp: any, req: RequestInfo): Observable<BaseResponse> {
        let error: string;
        if (!resp || Math.trunc(resp.status / 100) === 5) {
            // THIS COULD BE NO INTERNET
            error = 'Please check your internet connection and try again.';
        } else if (resp.status === 403 && 'date' in resp.headers && !this.deviceHasValidDate(resp.headers.date)) {
            error = 'Please check your device date and try again.';
        } else if (resp.status !== 200) {
            error = resp.statusText || (resp.data && resp.data.message) || 'An unexpected network error occured.'
        } else {
            error = resp.statusText || resp.data.message || 'An internal server error occured.';
        }
        // Got 200 .. server sent error intentionally
        let response = new BaseResponse('MH' + (500 || (resp && resp.status)), error);
        return this.wrapResponse(response, req);
    }
    wrapResponse(response: any, req: RequestInfo): any {
        this
            .store
            .dispatch(this.genActs.endAPIRequest(req, response));
        if (response.ok() || req.canHandleErrors) {
            // Response Success or Request able to handle own responses
            return response;
        }
        return response;
    }

    handleResponse(resp: Response, req: RequestInfo): BaseResponse {
        if (resp.status !== 200) {
            throw new Error(resp.statusText);
        }
        let resObj = resp.json() || {};
        let response = Object.assign(new BaseResponse(), resObj);
        return this.wrapResponse(response, req);
    }

    getOptions(user: User, req: RequestInfo): RequestOptions {
        let headers = new Headers({ 'X-API-KEY': 'my-api-key', 'Content-Type': 'application/json; charset=utf-8' });

        let options = new RequestOptions({ headers: headers });
        return options;
    }

    isOffline(): boolean {
        // if (this.platform.is('cordova')) {     return navigator.connection.type ===
        // Connection.NONE; } else {     return !navigator.onLine; }
        return false;
    }
    getHeaders(user: any): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (user && user.data && user.data.access_token) {
            headers.append(HEADE_TOKEN, 'Bearer ' + user.data.access_token);
        }
        return headers;
    }
    makeRequest(req: RequestInfo): Observable<any> {
        if (this.isOffline()) {
            // return this.wrapResponse(new BaseResponse(BaseResponse.MH_OFFLINE,
            // this.translator().translate(         'mainService_nw')), req);
        }
        this.store.dispatch(this.genActs.startAPIRequest(req));
        return this.auth.getUser()
            .switchMap(user => {
                this.loaderObj.showLoader();
                let apigReq: Observable<Response> = this.httpObj.request(req.url, {
                    body: req.body,
                    method: req.method,
                    headers: this.getHeaders(user)
                });
                return apigReq.map(res => {
                    // this
                    //     .loaderObj
                    //     .hideLoader();
                    return this.handleResponse(res, req);
                }).catch(e => {
                    // this
                    //     .loaderObj
                    //     .hideLoader();
                    return this.handleError(e.response, req);
                }).finally(() => {
                    this
                        .loaderObj
                        .hideLoader();
                });
            });
    }
    get(req: RequestInfo): any {
        req.method = 'GET';
        return this.makeRequest(req);
    }
    post(req: RequestInfo): Observable<any> {
        req.method = 'POST';
        return this.makeRequest(req);
    }

    delete(req: RequestInfo): Observable<any> {
        req.method = 'DELETE';
        return this.makeRequest(req);
    }

    put(req: RequestInfo): Observable<any> {
        req.method = 'PUT';
        return this.makeRequest(req);
    }
}