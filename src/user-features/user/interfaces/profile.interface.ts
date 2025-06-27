export interface IProfileUISettings {
	theme: string;
	nightMode: boolean;
	textSize: string;
}

export interface IUserProfile {
	_id: string;
	userId: string;
	name: string;
	lastname: string;
	userColor: string;
	photoURL: string;
	UI_Settings: IProfileUISettings;
}
