import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

import {User, SignupDetails, IUserInfo} from '../models/user';

@Injectable()
export class UserActions {

    static USER_AUTH_TYPE = 'USER_AUTH_TYPE';
    updateAuthType(authType : any) : Action {
        return {type: UserActions.USER_AUTH_TYPE, payload: authType};
    }

    static IS_LOGGEDIN = 'IS_LOGGEDIN';
    updateIsLoggedin(isLoggedin : boolean) : Action {
        return {type: UserActions.IS_LOGGEDIN, payload: isLoggedin};
    }

    static USER_MOBILE_NO = 'USER_MOBILE_NO';
    updateMobileNumber(mobile : number) : Action {
        console.log(mobile);
        return {type: UserActions.USER_MOBILE_NO, payload: mobile};
    }

    static OTP_SENT = 'OTP_SENT';
    OTPSent(result : {}) : Action {
        console.log(result);
        return {type: UserActions.OTP_SENT, payload: result};
    }

    static CREATE_ACCOUNT = 'CREATE_ACCOUNT';
    createAccount(signup : SignupDetails) : Action {
        return {type: UserActions.CREATE_ACCOUNT, payload: signup};
    }

    static RESET_PASSWORD = 'RESET_PASSWORD';
    resetPassword(mobile : string) : Action {
        return {type: UserActions.RESET_PASSWORD, payload: mobile};
    }

    static USER_LOGIN = 'USER_LOGIN';
    userLogin(loginInfo : IUserInfo) : Action {
        return {type: UserActions.USER_LOGIN, payload: loginInfo}
    }

    static LOGIN_SUCCESS = 'LOGIN_SUCCESS';
    loginSuccess(response : any) : Action {
        return {type: UserActions.LOGIN_SUCCESS, payload: response}
    }

    static LOGIN_FAILURE = 'LOGIN_FAILURE'
    loginFailure(data : any) : Action {
        return {type: UserActions.LOGIN_FAILURE, payload: data}
    }

    static LOGOUT_SUCESS = 'LOGOUT_SUCESS'
    logoutSuccess() : Action {
        return {type: UserActions.LOGOUT_SUCESS}
    }

    static UPDATE_SIDE_MENU = 'UPDATE_SIDE_MENU'
    updateSideMenu(data:{tabIndex:number}): Action {
        return {
            type: UserActions.UPDATE_SIDE_MENU,
            payload:data
        }
    }
   
}