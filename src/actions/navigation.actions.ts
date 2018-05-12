import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Navigation, NavigationType } from '../models/navigation';

@Injectable()
export class NavigationActions {

    static NAVIGATE_TO_PAGE = 'NAVIGATE_TO_PAGE';
    navigateToPage(page: Pages, clearHistory?: boolean, data?: any): Action {
        return {
            payload: {
                NavParams: data || {},
                Page: page,
                PageType: NavigationType.PAGE,
                clearHistory: clearHistory,
                replace: false
            },
            type: NavigationActions.NAVIGATE_TO_PAGE
        };
    }

    replacePage(page: Pages, data?: any): Action {
        return {
            payload: {
                NavParams: data || {},
                Page: page,
                PageType: NavigationType.PAGE,
                clearHistory: false,
                replace: true
            },
            type: NavigationActions.NAVIGATE_TO_PAGE
        };
    }

    static NAVIGATE_TO_DIALOG = 'NAVIGATE_TO_DIALOG';
    navigateToDialog(page: Pages, data?: any, onDismiss?: Function): Action {
        return {
            payload: {
                NavParams: data || {},
                Page: page,
                PageType: NavigationType.DIALOG,
                onDismiss: onDismiss
            },
            type: NavigationActions.NAVIGATE_TO_DIALOG
        };
    }

    static NAVIGATE_BACK = 'NAVIGATE_BACK';
    goBack(): Action {
        return {
            payload: {
                PageType: NavigationType.GO_BACK
            },
            type: NavigationActions.NAVIGATE_BACK
        };
    }

    static SHOW_ERROR = 'SHOW_ERROR';
    showError(error: string, title?: string): Action {
        return {
            payload: {
                NavParams: {
                    error: error,
                    title: title
                },
                PageType: NavigationType.ERROR
            },
            type: NavigationActions.SHOW_ERROR
        };
    }

    static SHOW_INFO = 'SHOW_INFO';
    showInfo(message: string, title?: string, onDismiss?: Function): Action {
        return {
            payload: {
                NavParams: {
                    message: message,
                    title: title
                },
                PageType: NavigationType.INFO,
                onDismiss: onDismiss
            },
            type: NavigationActions.SHOW_INFO
        };
    }

}

export enum Pages {
    PHONE, LOGIN, SIGNUP, HOME, REVIEWS, STYLETIPS, WASHTIPS
}
