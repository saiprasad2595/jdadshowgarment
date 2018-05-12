import { Component } from '@angular/core';
import {
    ModalController, NavController,
    ViewController,
} from 'ionic-angular';
import { ViewChild, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../reducers';
import {
    NavigationActions,
    Pages
} from '../../actions/navigation.actions';
import * as _ from 'lodash';
import { Location, PlatformLocation } from '@angular/common';
@Component({
    selector: 'washTips',
    templateUrl: 'washTips.html'
})
export class WashTips {
    washDetails: any;
    constructor(
        private navActs: NavigationActions,
        private locationUrl: Location,
        private platformLocation: PlatformLocation,
        private store: Store<IAppState>,
        private cd: ChangeDetectorRef) {
        let url = this.platformLocation.search;
        let urlId = Number(url.slice(4))
        this.store.select(s => s.garment.garmentDetails)
            .subscribe(washDetails => {
                this.washDetails = _.filter(washDetails, { id: urlId })
                this.washDetails = this.washDetails[0];
            })
    }
    ngDoCheck(): void {
        this.cd.markForCheck();
    }
}