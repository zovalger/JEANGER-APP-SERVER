export class ErrorWithHttpStatus extends Error {
	constructor(
		readonly status: number,
		readonly message: string,
		...params: any[]
	) {
		super(...params);
	}
}

export class NotFoundException extends ErrorWithHttpStatus {
	constructor(readonly message: string, ...params: any[]) {
		super(404, message, ...params);
	}
}

export class BadRequestException extends ErrorWithHttpStatus {
	constructor(readonly message: string, ...params: any[]) {
		super(400, message, ...params);
	}
}
