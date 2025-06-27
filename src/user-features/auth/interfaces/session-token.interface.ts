export interface ISessionToken {
	_id: string;
	userId: string;
	token: string;
	type: string
	expiration?: Date;
	
	createdAt: Date;
	updatedAt: Date;
}
