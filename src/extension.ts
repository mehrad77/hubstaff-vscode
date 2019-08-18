import * as vscode from 'vscode';
import axios from "axios";
import { getGlobalState, usePrompt, useQuickPick, setGlobalState } from "./hooks";
import { _getString } from './strings';
import { API } from './API';
import { IAuth, IUserWithAuthToken, IReport } from './types';

let myStatusBarItem: vscode.StatusBarItem;

// register a command that is invoked when the status bar
// item is selected
const activationCommand = 'extension.hubstaff';

export function activate(context: vscode.ExtensionContext) {
	const { 
		globalState,
		subscriptions
	} = context;

	const { APP_TOKEN, EMAIL, PASSWORD, AUTH_TOKEN } = getGlobalState(globalState);
	console.log({ APP_TOKEN, EMAIL, PASSWORD, AUTH_TOKEN });
	if (APP_TOKEN && EMAIL && PASSWORD){
		API.Auth({APP_TOKEN, EMAIL, PASSWORD}).then((User:any) => {					
			console.log({User});
			setGlobalState(globalState,{AUTH_TOKEN: User.auth_token});
		});
	}

	subscriptions.push(vscode.commands.registerCommand(activationCommand, async () => {

		useQuickPick(context).then(async (value) => {
			if (value === 'DELETE'){
				setGlobalState(globalState,{});
				vscode.window.showInformationMessage(`All settings removed.`);
			}
			else if(value !== undefined){
				await usePrompt(context,value).then(async () => {
					vscode.window.showInformationMessage(`Your ${_getString(value)} is set now!`);
					const { APP_TOKEN, EMAIL, PASSWORD, AUTH_TOKEN } = getGlobalState(globalState);
					if (APP_TOKEN && EMAIL && PASSWORD){
						API.Auth({APP_TOKEN, EMAIL, PASSWORD}).then((User:any) => {					
							console.log({User});
							setGlobalState(globalState,{AUTH_TOKEN: User.auth_token});
						});
					}
				});
			} else  {
				vscode.window.showErrorMessage(`Command got cancelled.`);
			}
		});
	}));


	// create a new status bar item that we can now manage
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	myStatusBarItem.command = activationCommand;
	subscriptions.push(myStatusBarItem);

	// register some listener that make sure the status bar 
	// item always up-to-date
	subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
	subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

	// update status bar item once at start
	updateStatusBarItem(context);
}


function updateStatusBarItem(context: any): void {
	const { APP_TOKEN, AUTH_TOKEN } = getGlobalState(context.globalState);
	myStatusBarItem.text = `$(clock) Hubstaff APP Token not registerd yet`;
	myStatusBarItem.show();
	if (APP_TOKEN && AUTH_TOKEN) {
		API.custom.by_date.my(APP_TOKEN, AUTH_TOKEN).then(data => {		
			const Data: IReport = data as IReport;
			console.log({Data})
			myStatusBarItem.text = `$(clock) Hubstaff APP Token not registerd yet`;
			myStatusBarItem.show();
		});
	} else {
		myStatusBarItem.text = `$(key) Hubstaff APP Token not registerd yet`;
		myStatusBarItem.show();
		// myStatusBarItem.hide();
	}
}

export function deactivate() {}
