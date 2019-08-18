import { TAskFor } from "./types";

export function _getString(index:TAskFor,type: 'strings' | 'describtions' = 'strings'): string{
	const _Strings = {
		"APP_TOKEN": 'Hubstaff App Token',
		"EMAIL": 'Hubstaff Account Email',
		"PASSWORD": 'Hubstaff Account Password',
		"DELETE": 'Reset extenteion data.',
	};
	const _Describtions = {
		"APP_TOKEN": 'you can find you App Token in https://app.hubstaff.com/developer/my_apps',
		"EMAIL": 'Hubstaff Account Email',
		"PASSWORD": 'Hubstaff Account Password',
		"DELETE": 'Delete all token and data that the extention stored.',
	};
	return type === 'strings'
		?	_Strings[index] 
		:	_Describtions[index];
}
