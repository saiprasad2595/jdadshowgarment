import { ActionReducer, Action } from '@ngrx/store';
import { UserActions } from '../actions/user.actions';

import { User, ISideMenu } from '../models/user';
import { Pages } from '../actions/navigation.actions'
import * as _ from 'lodash';

let sideMenu: any = [
    {
        id: 1,
        title: 'DASHBOARD',
        icon: 'icon-dashboard',
        isActive: true,
        pageKey: Pages.LOGIN
    },
    {
        id: 2,
        title: 'TASKS',
        icon: 'icon-tasklist',
        isActive: false,
        pageKey: Pages.LOGIN
    },
    {
        id: 3,
        title: 'APPROVALS',
        icon: 'icon-approvals',
        isActive: false,
        pageKey: Pages.LOGIN
    }
]

export interface IUserState {
    IsLoggedin: boolean;
    ErrorMessage: string;
    current: User;
    whetherDetails: any
    sideMenuList: any;
    isUserExist: boolean;
}

const initial: IUserState = {
    current: Object.assign(new User()),
    IsLoggedin: false,
    ErrorMessage: '',
    whetherDetails: {},
    sideMenuList: [
        {
            id: 1,
            title: 'DASHBOARD',
            icon: 'icon-dashboard',
            isActive: true,
            pageKey: Pages.PHONE
        },
        {
            id: 2,
            title: 'TASKS',
            icon: 'icon-tasklist',
            isActive: false,
            pageKey: Pages.SIGNUP
        },
        {
            id: 3,
            title: 'APPROVALS',
            icon: 'icon-approvals',
            isActive: false,
            pageKey: Pages.LOGIN
        },
        // {
        //     id: 4,
        //     title: 'Profile',
        //     icon: 'icon-profile',
        //     isActive: false,
        //     pageKey: Pages.APPROVALS_DASHBOARD
        // }
    ],
    isUserExist: true
}

export const UsersReducer: ActionReducer<IUserState> = (state: IUserState = initial, action: Action) => {
    switch (action.type) {
        case UserActions.USER_AUTH_TYPE:
            return Object.assign({}, state, { LoginType: action.payload });
        case UserActions.IS_LOGGEDIN:
            return Object.assign({}, state, { IsLoggedin: action.payload });
        case UserActions.USER_MOBILE_NO:
            console.log(action.payload);
            return Object.assign({}, state, { Mobile: action.payload });
        case UserActions.OTP_SENT:
            return Object.assign({}, state, {
                // Mobile: action.payload ? state.Mobile : false
            });
        case UserActions.LOGIN_SUCCESS: {

            let _isLoggedin = false;
            let _isUserExist = false;
            let _currentUserInfo = {
                access_token: '',
                firstName: '',
                lastName: '',
                roleName: '',
                expires_in: '',
                token_type: '',
                userId: ''
            };
            if (action.payload.data != null) {
                _isUserExist = true
                _isLoggedin = true;
                _currentUserInfo.access_token = action.payload.data.access_token;
                _currentUserInfo.firstName = action.payload.data.firstName;
                _currentUserInfo.lastName = action.payload.data.lastName;
                _currentUserInfo.roleName = action.payload.data.roleName;
                _currentUserInfo.expires_in = action.payload.data.expires_in;
                _currentUserInfo.token_type = action.payload.data.token_type;
                _currentUserInfo.userId = action.payload.data.userId;
            }

            return Object.assign({}, state, {
                IsLoggedin: _isLoggedin,
                current: _currentUserInfo,
                isUserExist: _isUserExist
            });

        }
        case UserActions.LOGIN_FAILURE:
            return Object.assign({}, state, {
                IsLoggedin: false,
                ErrorMessage: action.payload.message
            })
        case UserActions.LOGOUT_SUCESS:
            {
                return Object.assign({}, state, initial)
            }
        case UserActions.UPDATE_SIDE_MENU: {
            _.each(state.sideMenuList, (tab, index) => {
                if (tab.id === action.payload.tabIndex) {
                    state.sideMenuList[index].isActive = true;
                } else {
                    state.sideMenuList[index].isActive = false;
                }
            })
            return Object.assign({}, state)
        }

        default:
            return state;
    };
};