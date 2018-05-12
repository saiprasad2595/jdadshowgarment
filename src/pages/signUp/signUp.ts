import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ModalController, NavController, ViewController} from 'ionic-angular';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { UserActions } from '../../actions/user.actions';

import { UserPhonePage } from '../userPhone/userPhone';
import { SignupDetails } from '../../models/user';

import { NavigationActions, Pages } from '../../actions/navigation.actions';

@Component({
  selector: 'signUp',
  templateUrl: 'signUp.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUp {
    signup: SignupDetails;
    confirmPassword: string;

    constructor(
        private viewCtrl: ViewController,
        private navCtrl: NavController,
        private store: Store<IAppState>,
        private userActions: UserActions,
        private modalCtrl: ModalController,
        private navActs: NavigationActions) {
            this.signup = new SignupDetails();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    goBack() {
        this.store.dispatch(this.navActs.navigateToDialog(Pages.PHONE));
        this.dismiss();
    }

    showTAC() {
        // let tNc = Pages.TERMS_AND_CONDITIONS;
        // this.store.dispatch(this.navActs.navigateToDialog(tNc));
        this.dismiss();
    }

    createAccount() {
        if (this.signup.password !== this.confirmPassword) {
            alert('Password and Confirm password should be same.');
            return;
        }
        this.store.dispatch(this.userActions.createAccount(this.signup));
    }
}