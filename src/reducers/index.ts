import '@ngrx/core/add/operator/select';
import { combineReducers } from '@ngrx/store';
export * from './user.reducer';
export * from './navigation.reducer';
import { UsersReducer, IUserState } from './user.reducer';
import { storeLogger } from 'ngrx-store-logger';
import { localStorageSync } from 'ngrx-store-localstorage';
import { NavigationReducer } from './navigation.reducer';
import { GarmentReducer } from './garment.reducer';
import { Navigation } from '../models';
import { compose } from '@ngrx/core';
import { IGarmentState } from './garment.reducer';

export interface IAppState {
    navigation: Navigation;
    User: IUserState;
    garment: IGarmentState
}

export const reducers = {
    navigation: NavigationReducer,
    User: UsersReducer,
    garment: GarmentReducer

}

let store = compose(localStorageSync({
    keys: ['User'],
    rehydrate: true
}), combineReducers)(reducers);

export default store;
