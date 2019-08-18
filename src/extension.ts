import * as vscode from 'vscode';
import axios from "axios";

let myStatusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	const { 
		globalState,
		subscriptions
	} = context;

	// let disposable = vscode.commands.registerCommand('extension.hubstaff', async () => {

	// 	let USER_API_KEY = globalState.get('API_KEY', '');
	// 	console.log(Boolean(USER_API_KEY),{USER_API_KEY});

	// 	// if there was no API key stored in extention storage, ask for one
	// 	if(USER_API_KEY){
	// 		axios.defaults.headers.common['X-API-Key'] = USER_API_KEY;
	// 		await vscode.window.showInformationMessage(`API key is already set!`);
	// 	}
	// 	else {
	// 		await askForAPIKey(context).then(
	// 			() => vscode.window.showInformationMessage(`API key is set now!`)
	// 		);
			
	// 	}
	// });

	// subscriptions.push(disposable);





	// register a command that is invoked when the status bar
	// item is selected
	const myCommandId = 'sample.showSelectionCount';
	subscriptions.push(vscode.commands.registerCommand(myCommandId, () => {
		let n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
		vscode.window.showInformationMessage(`Yeah, ${n} line(s) selected... Keep going!`);
	}));

	// create a new status bar item that we can now manage
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	myStatusBarItem.command = myCommandId;
	subscriptions.push(myStatusBarItem);

	// register some listener that make sure the status bar 
	// item always up-to-date
	subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
	subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

	// update status bar item once at start
	updateStatusBarItem();
}

// const askForAPIKey = (context: any) => {
// 	return new Promise(resolve => {
// 		vscode.window.showInputBox({
// 			placeHolder:"Enter you kutt.it API key...",
// 			prompt: "you can find you API key in https://kutt.it/settings",
// 			validateInput: (value) => {
// 				if(value.match(/.{40}/)) return null;
// 				return "API lenght must be 40 character length."
// 			}
// 		})
// 		.then(
// 			(value?: string) => {
// 				context.globalState.update('API_KEY', value);
// 				axios.defaults.headers.common['X-API-Key'] = value;
// 				resolve();
// 			},
// 			(reason: any) => {
// 				console.error("ERR002: Something bad happend.",reason)
// 			}
// 		);
// 	});
// }

function updateStatusBarItem(): void {
	let n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
	if (n > 0) {
		myStatusBarItem.text = `$(megaphone) ${n} line(s) selected`;
		myStatusBarItem.show();
	} else {
		myStatusBarItem.hide();
	}
}

function getNumberOfSelectedLines(editor: vscode.TextEditor | undefined): number {
	let lines = 0;
	if (editor) {
		lines = editor.selections.reduce((prev, curr) => prev + (curr.end.line - curr.start.line), 0);
	}
	return lines;
}

export function deactivate() {}
