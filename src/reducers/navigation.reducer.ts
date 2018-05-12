import { ActionReducer, Action } from '@ngrx/store';
import { NavigationActions } from '../actions/navigation.actions';

import { Navigation } from '../models/navigation';

export const NavigationReducer: ActionReducer<Navigation> =
    (state: Navigation, action: Action) => {
    switch (action.type) {
        case NavigationActions.NAVIGATE_TO_PAGE:
            return Object.assign({}, state, action.payload);
        case NavigationActions.NAVIGATE_TO_DIALOG:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    };
};