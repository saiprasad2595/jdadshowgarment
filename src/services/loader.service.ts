import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import _ from 'lodash';

@Injectable()
export class LoadingService {
    loading: any;
    _loadingObserver: any;
    count = 0;
    silent = false;
    scheduledHide: number;

    constructor() {
        this.loading = Observable.create(observer => {
            this._loadingObserver = observer;
        });
    }

    toggleLoadingIndicator(name): void {
        if (this._loadingObserver) {
            this._loadingObserver.next(name);
        }
    }

    silentLoader(silent: boolean): void {
        this.silent = silent;
    }

    showLoader(): void {
        this.count++;
        if (this.count > 0 && !this.silent) {
            if (this.scheduledHide) {
                clearTimeout(this.scheduledHide);
            }
            this.toggleLoadingIndicator(true);
        }
    }

    hideLoader(): void {
        this.count--;
        if (this.count < 0) {
            this.count = 0;
        }
        if (this.count === 0) {
            this.scheduledHide = _.delay(() => {
                this.toggleLoadingIndicator(false);
            }, 100);
        }
    }
}
