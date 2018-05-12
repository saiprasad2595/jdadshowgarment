import { BaseResponse } from './api'
export class SignupDetails {
    password: string;
    firstName: string;
    lastName: string;
    street: string;
    number: string;
    city: string;
    zipcode: string;
    country: string;
}

export interface IError {
    userName: string;
    password: string;
}

export interface IUserInfo {
    userName: string;
    password: string;
}

export class ISideMenu {
    id: number;
    title: string;
    icon: string;
    isActive: boolean;
    pageKey: number;
}
export class User extends BaseResponse {
    userId?: number;
    roleName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    access_token: string;
    isAuthenticated(): boolean {
        return this.access_token !== undefined;
    }
}