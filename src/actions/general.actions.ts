import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { BaseResponse } from '../models'
import { RequestInfo } from '../services/main.service'

@Injectable()
export class GeneralActions {

    static START_API_REQUEST = 'START_API_REQUEST';
    startAPIRequest(request: any): Action {
        console.log('req', request);
        return {
            payload: request,
            type: GeneralActions.START_API_REQUEST
        }
    }

    static END_API_REQUEST = 'END_API_REQUEST';
    endAPIRequest(request: RequestInfo, response: BaseResponse): Action {
        return {
            payload: {
                request: request,
                response: response
            },
            type: GeneralActions.END_API_REQUEST
        }
    }
}
