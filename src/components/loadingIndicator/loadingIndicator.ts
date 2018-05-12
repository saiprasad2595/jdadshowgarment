import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LoadingService } from '../../services/loader.service';
import { LoadingController } from 'ionic-angular';

@Component({
    selector: 'loading-indicator',
    templateUrl: 'loadingIndicator.html',
    // template: "",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingIndicator {
    private isLoading = false;
    private subscription: any;
    private loader: any = false;
    constructor(
        public loadingService: LoadingService,
        public loadingCtrl: LoadingController,
        private ref: ChangeDetectorRef) { }

    showOrHideLoadingIndicator(loading) {
        if (this.isLoading === loading) {
            return;
        }
        this.isLoading = loading;
        if (this.isLoading) this.playLoadingAnimation();
        else this.stopLoadingAnimation();
    }

    playLoadingAnimation() {
        this.loader = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });

        this.loader.present();
    }
    stopLoadingAnimation() {
        setTimeout(() => {
            this.loader.dismiss();
        }, 1000);
    }
    ngOnInit() {
        this.subscription = this.loadingService.loading.
            subscribe(loading => {
                this.showOrHideLoadingIndicator(loading);
                this.ref.detectChanges();
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
