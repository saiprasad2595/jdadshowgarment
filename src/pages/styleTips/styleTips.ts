import { Component } from '@angular/core';
import {
    ModalController, NavController,
    ViewController,
} from 'ionic-angular';
import { ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../reducers';
import {
    NavigationActions,
    Pages
} from '../../actions/navigation.actions';
import * as _ from 'lodash';
import { Location, PlatformLocation } from '@angular/common';
@Component({
    selector: 'styleTips',
    templateUrl: 'styleTips.html'
})
export class StyleTips {
    styleDetails: any;
    urlNum : number;
    constructor(
        private navActs: NavigationActions,
        private platformLocation: PlatformLocation,
        private cd: ChangeDetectorRef,
        private store: Store<IAppState>) {
        let url = this.platformLocation.search;
        let urlId = Number(url.slice(4))
        this.urlNum = urlId;
        console.log('urlId',urlId);
        this.store.select(s => s.garment.garmentDetails)
            .subscribe(styleDetails => {
                this.styleDetails = _.filter(styleDetails, { id: urlId })
                this.styleDetails = this.styleDetails[0]
            })
    }
    ngDoCheck(): void {
        this.cd.markForCheck();
    }

}