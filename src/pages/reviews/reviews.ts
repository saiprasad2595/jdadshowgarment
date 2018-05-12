import { Component } from '@angular/core';
import {
    ModalController, NavController,
    ViewController,
} from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../reducers';
import { ChangeDetectorRef } from '@angular/core';
import {
    NavigationActions,
    Pages
} from '../../actions/navigation.actions';
import { IReview } from '../../models/garment'
import { Observable } from 'rxjs/observable'
import {
    AngularFirestore,
    AngularFirestoreCollection
} from 'angularfire2/firestore';
import { AlertController } from 'ionic-angular';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { Location, PlatformLocation } from '@angular/common';
import { AngularFireDatabase } from 'angularfire2/database';
import {
    AngularFireStorage,
    AngularFireUploadTask
} from 'angularfire2/storage';
@Component({
    selector: 'reviews',
    templateUrl: 'reviews.html'
})
export class Reviews {
    downloadUrlSubs$: Observable<any>;
    downloadUrl: string;
    progressBar: any;
    imgUploadFile : any;
    uploadProgress: any;
    ref: any;
    task: any;
    name: string;
    email: string;
    comments: string;
    urlId: number;
    reviewData: IReview[];
    review$: Subscription;
    reviewCollection: AngularFirestoreCollection<IReview>;
    constructor(
        private cd: ChangeDetectorRef,
        private alertCtrl: AlertController,
        private platformLocation: PlatformLocation,
        private db: AngularFirestore,
        private firedb: AngularFireDatabase,
        private navActs: NavigationActions,
        private afStorage: AngularFireStorage,
        private store: Store<IAppState>) {
        let url = this.platformLocation.search;
        this.urlId = Number(url.slice(4))
        this.reviewCollection = db.collection<IReview>('/reviewList');
        this.review$ = db.collection('/reviewList').valueChanges()
            .subscribe((reviewList) => {
                this.reviewData = _.filter(reviewList, { id: this.urlId })
                this.cd.markForCheck();
            })
    }
    validateReview(): boolean {
        if (!this.name) {
            this.showAlert('Please enter name')
            return false;
        }
        if (!this.email) {
            this.showAlert('Please enter email')
            return false;
        }
        if (!this.comments) {
            this.showAlert('Please enter comments')
            return false;
        }
        return true;
    }
    showAlert(msg: string) {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['ok']
        });
        alert.present();
    }
    submitReview(): void {
        if (!this.validateReview()) {
            return;
        }
        this.reviewCollection.add({
            comments: this.comments,
            emailId: this.email,
            id: this.urlId,
            name: this.name,
            reviewUrl : this.downloadUrl
        })
        this.comments = '';
        this.email = '';
        this.name = '';
        this.downloadUrl = '';
        this.imgUploadFile = '';
        this.uploadProgress = 0;
    }
    uploadImg(e): void {
        const randomId = Math.random().toString(36).substring(2);
        this.ref = this.afStorage.ref(randomId);
        this.task = this.ref.put(e.target.files[0]);
        this.downloadUrlSubs$ = this.task.downloadURL();
        this.uploadProgress = this.task.percentageChanges();
        this.downloadUrlSubs$.subscribe((url => {
            this.downloadUrl = url;
        }))
    }
}