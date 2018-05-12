import { Component, ViewChild } from '@angular/core';
import {
    Nav,
    Platform,
    ModalController,
    Modal,
    AlertController,
    IonicApp,
    Events
} from 'ionic-angular';
import { StatusBar } from "@ionic-native/status-bar";
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '../reducers';
import { MenuController } from 'ionic-angular';
import {
    SignUp,
    Login,
    Home,
    Reviews,
    WashTips,
    StyleTips
} from '../pages';
import { Navigation, NavigationType } from '../models/navigation';
import { Pages } from '../actions/navigation.actions';
import { NavigationActions } from '../actions/index';
import { UserActions } from '../actions/';
import * as _ from 'lodash';
import { firebaseConfig } from '../config/appConfig';
@Component({ templateUrl: 'app.html' })
export class MyApp {
    userSubscription: any;
    @ViewChild(Nav) nav: Nav;

    rootPage: any;
    pages: Array<{
        title: string,
        component: any
    }>;
    navSubscription: Subscription;
    enableMenu = true;
    isLoggedIn: boolean = false;
    private currentTabId: number = 1;
    private taskSelectType: boolean = false;
    constructor(public platform: Platform,
        private store: Store<IAppState>,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private statusBar: StatusBar,
        private userActions: UserActions,
        // private splashscreen: SplashScreen,
        private navActs: NavigationActions,
        private events: Events,
        private menuCtrl: MenuController,
        private ionicApp: IonicApp) {
        this.initializeApp = this.initializeApp.bind(this);
        this.platform.ready()
            .then(() => {
                this.initializeApp();
            });
    }

    showError(e: any): void {
        let alert = this
            .alertCtrl
            .create({
                buttons: ['OK'],
                subTitle: e.error,
                title: e.title || 'Garment'
            });
        alert.present();
    }

    showInformation(message: string, onDismiss?: Function): void {
        let alert = this
            .alertCtrl
            .create({
                buttons: [
                    {
                        handler(): void {
                            if (onDismiss) {
                                onDismiss();
                            }
                        },
                        text: 'OK'
                    }
                ],
                subTitle: message,
                title: 'Garment'
            });
        alert.present();
    }

    navigateTo(navigation: Navigation): void {
        switch (navigation.PageType) {
            case NavigationType.ERROR:
                this.showError(navigation.NavParams);
                return;
            case NavigationType.INFO:
                this.showInformation(navigation.NavParams.message, navigation.onDismiss);
                return;
            default:
                break;
        }
        let page = this.getPage(navigation.Page);
        if (!page) {
            // NO PAGE PROVIDED
            console.log('NO PAGE PROVIDED TO NAVIGATE');
            return;
        }

        if (navigation.PageType === NavigationType.DIALOG) {
            let modal: Modal = this
                .modalCtrl
                .create(page, navigation.NavParams);
            // if (navigation.onDismiss) {   modal.onDidDismiss(navigation.onDismiss); }
            modal.present();
        } else if (navigation.PageType === NavigationType.GO_BACK) {
            this
                .nav
                .pop();
        } else {
            if (navigation.clearHistory) {
                this
                    .nav
                    .setRoot(page, navigation.NavParams);
            } else if (navigation.replace) {
                let length = this
                    .nav
                    .length();
                this
                    .nav
                    .push(page, navigation.NavParams)
                    .then(() => {
                        this
                            .nav
                            .remove(length - 1);
                    });
            } else {
                console.log('Navigating to Page ', Pages[navigation.Page]);
                this
                    .nav
                    .push(page, navigation.NavParams)
                    .then(() => {
                        console.log('Navigated to Page ', Pages[navigation.Page]);
                    })
                    .catch(e => {
                        console.log(e)
                        console.log('Error while pushing to page ', Pages[navigation.Page]);
                    });
            }
        }
    }

    getPage(navigation: Pages): any {
        switch (navigation) {
            case Pages.LOGIN:
                return Login;
            case Pages.SIGNUP:
                return SignUp;
            case Pages.HOME:
                return Home;
            case Pages.STYLETIPS:
                return StyleTips;
            case Pages.WASHTIPS:
                return WashTips;
            case Pages.REVIEWS:
                return Reviews;
            default:
                return undefined;
        }
    }

    // updateMenu(page: Pages): void {   this.enableMenu =
    // this.isMenuRequired(page); }

    isMenuRequired(page: any): boolean {
        switch (page) {
            case Pages.LOGIN:
                return true;
            default:
                return false;
        }
    }

    confirmExit(self: MyApp): void {
        let alert = this
            .alertCtrl
            .create({
                buttons: [
                    {
                        text: 'Cancel'
                    }, {
                        handler(): void {
                            self
                                .platform
                                .exitApp();
                        },
                        text: 'OK'
                    }
                ],
                subTitle: 'Are you sure you want to Exit?',
                title: 'Garment'
            });
        alert.present();
    }

    initializeApp(): void {
        this.rootPage = Home;
        this
            .statusBar
            .styleDefault();
        // this
        //     .splashscreen
        //     .hide();

        this.store
            .select(s => s.navigation)
            .subscribe(navigation => {
                if (!navigation) {
                    return;
                }
                this.navigateTo(navigation as Navigation);
            });

        this.platform
            .registerBackButtonAction((e) => {
                let activePortal = this.ionicApp._loadingPortal
                    .getActive() || this.ionicApp
                        ._modalPortal
                        .getActive() || this
                            .ionicApp
                            ._toastPortal
                            .getActive() || this
                                .ionicApp
                                ._overlayPortal
                                .getActive();
                if (activePortal) {
                    // MODAL DIALOG
                    activePortal.dismiss();
                    return;
                }
                if (this.nav.canGoBack()) {
                    // PAGE STACK
                    this
                        .nav
                        .pop();
                    return;
                }
                this.confirmExit(this);
            });

        // this.nav.viewDidEnter.map(vc => vc.component)   .subscribe(page =>
        // this.updateMenu(page));
    }



    openPage(page): void {
        // this.nav.setRoot(page.component);
        switch (page) {
            case 'styleTips':
                this.rootPage = StyleTips;
                this.menuCtrl.close();
                break;
            case 'washTips':
                this.rootPage = WashTips;
                this.menuCtrl.close();
                break;
            case 'reviews':
                this.rootPage = Reviews;
                this.menuCtrl.close();
                break;
            case 'home':
                this.rootPage = Home;
                this.menuCtrl.close();
                break;
            default:
                break;
        }
    }

    ngOnDestroy() {
        this
            .userSubscription
            .unsubscribe();
    }

}
