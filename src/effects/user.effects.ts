import { Injectable } from '@angular/core';
import { Effect, toPayload, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { IAppState } from '../reducers';
import { UserService, AuthService } from '../services';
import { User, SignupDetails } from '../models/user';
import { UserActions } from '../actions/user.actions';

import { NavigationActions, Pages } from '../actions/navigation.actions';

@Injectable()
export class UserEffects {
    [x: string]: any;
    constructor(private actions$: Actions,
        private service: UserService, private userActions: UserActions,
        private navs: NavigationActions, private authService: AuthService,
        private store: Store<IAppState>) { }

    @Effect() login$ = this.actions$
        .ofType(UserActions.USER_LOGIN)
        .map(toPayload)
        .switchMap(payload => {
            return this.service.loginUser(payload)
                .map(response => {
                    if (response.status = 200) {
                        return this.userActions.loginSuccess(response);
                    }
                })
                .catch(error => {
                    alert('Connection Time Out. Please Try again');
                    return Observable.empty();
                });
        });
    @Effect() loginSuccess$ = this.actions$
        .ofType(UserActions.LOGIN_SUCCESS)
        .map(toPayload)
        .switchMap(payload => {
            if (payload.data != null) {
                return this.authService.setUser(payload)
                    .map(u => this.navs.navigateToPage(Pages.PHONE))
            }
            else {
                alert("User not exist");
                return Observable.empty();
            }
        })
}
