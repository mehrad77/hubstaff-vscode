import * as vscode from 'vscode';
import axios from "axios";
import { getGlobalState, usePrompt, useQuickPick, setGlobalState } from "./hooks";
import { _getString } from './strings';

let myStatusBarItem: vscode.StatusBarItem;

// register a command that is invoked when the status bar
// item is selected
const activationCommand = 'extension.hubstaff';

export function activate(context: vscode.ExtensionContext) {
	const { 
		globalState,
		subscriptions
	} = context;

	subscriptions.push(vscode.commands.registerCommand(activationCommand, async () => {
		console.log(getGlobalState(globalState));
		useQuickPick(context).then(async (value) => {
			if (value === 'DELETE'){
				setGlobalState(globalState,{});
				vscode.window.showInformationMessage(`All settings removed.`);
			}
			else if(value !== undefined){
				await usePrompt(context,value).then(async () => {
					vscode.window.showInformationMessage(`Your ${_getString(value)} is set now!`);
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
	const APP_TOKEN = context.globalState.get('APP_TOKEN', '');
	if (APP_TOKEN) {
		myStatusBarItem.text = `$(clock) Hubstaff APP Token not registerd yet`;
		myStatusBarItem.show();
	} else {
		myStatusBarItem.text = `$(key) Hubstaff APP Token not registerd yet`;
		myStatusBarItem.show();
		// myStatusBarItem.hide();
	}
}

export function deactivate() {}
