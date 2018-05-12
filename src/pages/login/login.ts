import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ModalController, NavController, ViewController, AlertController } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { UserActions } from '../../actions/user.actions';

import { SignupDetails, IError } from '../../models/user'

import { NavigationActions, Pages } from '../../actions/navigation.actions';
import { Http } from '@angular/http';
import { terminateChatBot } from '../utils';
@Component({ selector: 'login', templateUrl: 'login.html' })
export class Login {
    private userName: string = '';
    private password: string = '';
    public errors: any = {};
    public errorMessage: string = '';
    private isUserExist: boolean;
    constructor(private cd: ChangeDetectorRef, private viewCtrl: ViewController, private navCtrl: NavController, private store: Store<IAppState>, private userActions: UserActions, private modalCtrl: ModalController, private navActs: NavigationActions, public http: Http, private alertCtrl: AlertController) {

    }
    ionViewDidLoad(): void {

        if ((<any>window).botplatform) {
            terminateChatBot();
        }
    }
    ionViewDidEnter() {
        this.store
            .select(data => data.User)
            .subscribe(user => {
                if (user && user.IsLoggedin) {
                    // this.store.dispatch(     this.navActs.navigateToPage(Pages.DASH_BOARD));
                }
                if (user) {
                    this.errorMessage = user && user.ErrorMessage;
                    this.userName = '';
                    this.password = '';
                }

                this.isUserExist = user.isUserExist;
                this.cd.markForCheck();

            })
    }
    validationHandler(): boolean {
        this.errors = {};
        console.log("username:", this.userName, "password:", this.password);
        if (!this.userName) {
            this.errors.userName = 'Username Required';
        }
        if (!this.password) {
            this.errors.password = 'Password Required';
        }
        return Object
            .keys(this.errors)
            .length === 0;
    }
    doLogin(): void {
        console.log("this.validationHandler()", this.validationHandler());
        if (!this.validationHandler()) {
            return;
        }
        this
            .store
            .dispatch(this.userActions.userLogin({ userName: this.userName, password: this.password }))
    }
    goToSignup(): void {
        this.store.dispatch(this.navActs.navigateToPage(Pages.SIGNUP))
    }

}