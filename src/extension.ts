// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { execSync } from "child_process";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "react-native-dev-menu" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const devrnmenu = vscode.commands.registerCommand('react-native-dev-menu.devrnmenu', () => {
		// The code you place here will be executed every time your command is executed

		try {
			execSync('adb shell input keyevent 82');
			vscode.window.showInformationMessage('Dev Menu opened! Check your phone.');
		} catch (error) {
			vscode.window.showErrorMessage('There is something wrong. Check if you have a device connected and try again.');
		}
	});

	let reverseport = vscode.commands.registerCommand('react-native-dev-menu.reverseport', async () => {
		const port = await vscode.window.showInputBox({
			placeHolder: '8081',
			prompt: 'Enter a port to be reversed via tcp',
			validateInput: (input) => {
				const isOnlyNumber = /^\d+$/.test(input);

				if (!isOnlyNumber) {
					return 'The Port must be number only';
				}
			}
		});

		const portToUse = port ? port : '8081';

		try {
			execSync(`adb reverse tcp:${portToUse} tcp:${portToUse}`);
			vscode.window.showInformationMessage(`Port ${portToUse} successfully reversed :D`);
		} catch (error) {
			vscode.window.showErrorMessage(`There is something wrong. Check if port ${portToUse} is not in use and try again.`);
		}
	});

	context.subscriptions.push(devrnmenu, reverseport);
}

// this method is called when your extension is deactivated
export function deactivate() { }
