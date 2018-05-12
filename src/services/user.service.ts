import {Config} from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import {User, SignupDetails} from '../models/user';
import {Injectable, Injector} from '@angular/core';
import {Http} from '@angular/http';

// import { User } from '../models/user';
import {IUserInfo} from '../models/index';
import {MainService} from '../services/main.service';
import {userInfo} from 'os';
import {LoadingService} from '../services/loader.service';
import {AuthService} from '../services/auth.service';
import {IRequests} from '../config/appConfig';
@Injectable()
export class UserService extends MainService {

    reqs : IRequests;
    constructor(private http : Http, private config : Config, public loader : LoadingService, public auth : AuthService, injector : Injector) {
        super(http, config, loader, auth, injector);
        this.reqs = this
            .config
            .get('serviceRequests');
    }

    // validateUserByMobileNumber(mobileNumber): Observable<any> {     return
    // this.get(this.config.get('serviceRequests') .validateUserByMobileNumber +
    // mobileNumber); } signup(signup: SignupDetails): Observable<User> {     return
    // this.post(this.config.get('serviceRequests').signup, signup); }
    // resetPassword(mobile: string): Observable<boolean> {     return
    // this.get(this.config.get('serviceRequests')         .resetPassword + mobile);
    // } validateUser(userInfo: IUserInfo): Observable<any> {     return
    // this.post(this.config.get('serviceRequests').validateUser,         userInfo);
    // }
    loginUser(payload) : Observable < any > {
        return this.post({
            body: {
                email: payload.userName,
                password: payload.password
            },
            url: this.reqs.loginUser
        });
    }

}