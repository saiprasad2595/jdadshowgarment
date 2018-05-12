import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

import { User } from '../models';

const KEY_USER = 'garment_user';
export let LOGIN_TYPE_KEYCHAIN = 'Login_keychain';
import { Keychain } from '@ionic-native/keychain';
import { Platform } from 'ionic-angular';

@Injectable()
export class AuthService {

    constructor(
        private storage: Storage,
        public platform: Platform
    ) {
    }

    isOnIOS(): boolean {
        let win: any = window;
        return win.cordova && this.platform.is('ios');
    }

    getUser(): Observable<User> {
        return Observable.fromPromise(this.storage.get(KEY_USER).then(user => {
            if (user) {
                return user;
            }
            return new User();
        })).map(u => Object.assign(new User(), u));
    }

    setUser(user: User): Observable<User> {
        let setters = [this.storage.set(KEY_USER, user)];
        return Observable.fromPromise(Promise.all(setters)
            .then(result => user));
    }

    isAuthenticated(): Observable<boolean> {
        return this.getUser().map(u => u.isAuthenticated());
    }

    logout(): void {
        this.setUser(new User());
    }
}
