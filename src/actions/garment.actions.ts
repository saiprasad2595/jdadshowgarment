import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { BaseResponse } from '../models'
import { RequestInfo } from '../services/main.service'

@Injectable()
export class GarmentActions {

    static START_API_REQUEST = 'START_API_REQUEST';
    startAPIRequest(request: any): Action {
        console.log('req', request);
        return {
            payload: request,
            type: GarmentActions.START_API_REQUEST
        }
    }
}
