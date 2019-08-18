import * as vscode from 'vscode';
import { _getString } from './strings';
import { TAskFor, IData } from "./types";


export const getGlobalState = (globalState: any): IData => {
	const APP_TOKEN = globalState.get('APP_TOKEN', '');
	const EMAIL = globalState.get('EMAIL', '');
	const PASSWORD = globalState.get('PASSWORD', '');
	const AUTH_TOKEN = globalState.get('AUTH_TOKEN', '');
	return { APP_TOKEN, EMAIL, PASSWORD, AUTH_TOKEN };
};

export const setGlobalState = (globalState: any, {
	APP_TOKEN,
	EMAIL,
	PASSWORD,
	AUTH_TOKEN
}: IData): boolean => {
	if(APP_TOKEN) { globalState.update('APP_TOKEN', APP_TOKEN); }
	if(EMAIL) { globalState.update('EMAIL', EMAIL); }
	if(PASSWORD) { globalState.update('PASSWORD', PASSWORD); }
	if(AUTH_TOKEN) { globalState.update('AUTH_TOKEN', AUTH_TOKEN); }
	if(!APP_TOKEN && !EMAIL && !PASSWORD && !AUTH_TOKEN){
		globalState.update('APP_TOKEN', '');
		globalState.update('EMAIL', '');
		globalState.update('PASSWORD', '');
		globalState.update('AUTH_TOKEN', '');
	}
	return true;
};


export const usePrompt = (context: vscode.ExtensionContext, type: TAskFor): Promise<any> => {
	return new Promise(resolve => {
		vscode.window.showInputBox({
			placeHolder:`Enter your ${_getString(type)}`,
			prompt: _getString(type,'describtions'),
			validateInput: (value) => {
				if (type === 'APP_TOKEN') {
					if(value.match(/.{43}/)) {
						return null;
					}
					return "App Token lenght must be 43 character length.";
				}
				else {
					return null;
				}
			}
		})
		.then(
			(value?: string) => {
				context.globalState.update(type, value);
				resolve();
			},
			(reason: any) => {
				console.error("ERR002: Something bad happend.",reason);
			}
		);
	});
};

export const useQuickPick = (context: vscode.ExtensionContext): Promise<TAskFor> => {
	return new Promise(resolve => {
		const { APP_TOKEN, EMAIL, PASSWORD } = getGlobalState(context.globalState);
		let optionsArray = [];
		if(!APP_TOKEN) { optionsArray.push('Set App Token');}
		if(!EMAIL) { optionsArray.push('Set Email Address');}
		if(!PASSWORD) { optionsArray.push('Set Account Password');}
		optionsArray.push('Delete all settings');
		
		vscode.window.showQuickPick(optionsArray)
		.then(
			(value?: string) => {
				if(value === 'Set App Token'){
					resolve('APP_TOKEN');
				}
				else if(value === 'Set Email Address'){
					resolve('EMAIL');
				}
				else if(value === 'Set Account Password'){
					resolve('PASSWORD');
				}
				else if(value === 'Delete all settings'){
					resolve('DELETE');
				}
				else {
					resolve();
				}
			},
			(reason: any) => {
				console.error("ERR002: Something bad happend.",reason);
			}
		);
	});
};