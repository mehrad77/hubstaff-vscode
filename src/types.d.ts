export type TAskFor =  'APP_TOKEN' | 'EMAIL' | 'PASSWORD' | 'DELETE';

export interface IData {
    APP_TOKEN?: string;
    EMAIL?: string;
    PASSWORD?: string;
    AUTH_TOKEN?: string;
}

export interface IAuth {
    APP_TOKEN: string;
    EMAIL: string;
    PASSWORD: string;
}

export interface IUserWithAuthToken {
    id?: number;
    name?: string;
    last_activity?: string;
    auth_token?: string;
}