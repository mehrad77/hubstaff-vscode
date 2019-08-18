import * as vscode from 'vscode';
import axios from 'axios';
import { IAuth, IUserWithAuthToken } from './types';
import { setGlobalState } from './hooks';
const DOMAIN = 'https://api.hubstaff.com/v1';

const PreReq = (APP_TOKEN:string, AUTH_TOKEN?: string) => {
    axios.defaults.headers.common['App-Token'] = APP_TOKEN;
    if(AUTH_TOKEN) { 
        axios.defaults.headers.common['Auth-Token'] = AUTH_TOKEN;
    }
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    axios.defaults.headers.common['Accept'] = 'application/json';
};

const HandleError = (error:any) => {
    if (error.response) {
        /*
        * The request was made and the server responded with a
        * status code that falls out of the range of 2xx
        */
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
        if(error.response.status === 401){
            vscode.window.showErrorMessage(`Your API Key is not valid! please reset it.`);
        }
    } else {
        // Something happened in setting up the request and triggered an Error
        console.error('ERR004:', error.message);
    }
};

const Auth = ({
    APP_TOKEN,
    EMAIL,
    PASSWORD
}: IAuth) => {
    console.log(`auth API runned for ${EMAIL}.`);
    return new Promise(async resolve => {
        await PreReq(APP_TOKEN);
        await axios.post(`${DOMAIN}/auth`, {
            email: EMAIL,
            password: PASSWORD
        })
        .then((res: any) => {
            resolve(res.data.user as IUserWithAuthToken);
        }).catch(HandleError);
    });
};


const custom = {
    by_date: {
        my: (APP_TOKEN: string, AUTH_TOKEN: string) => {
            return new Promise(async resolve => {
                await PreReq(APP_TOKEN, AUTH_TOKEN);
                var start = new Date();
                var end = new Date();
                start.setHours(0,0,0,0);
                end.setHours(23,59,59,999);
                await axios.get(`${DOMAIN}/custom/by_date/my?start_date=${start.toISOString()}&end_date=${end.toISOString()}`)
                .then((res: any) => {
                    resolve(res.data);
                }).catch(HandleError);
            });
        }
    }
};

export const API = {
    Auth,
    custom
};