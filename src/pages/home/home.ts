import { Component } from '@angular/core';
import {
    ModalController, NavController,
    ViewController,
} from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../reducers';
import {
    NavigationActions,
    Pages
} from '../../actions/navigation.actions';
@Component({
    selector: 'home',
    templateUrl: 'home.html'
})
export class Home {
    constructor(
        private navActs: NavigationActions,
        private store: Store<IAppState>) {

    }
}