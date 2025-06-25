export class ErrorWithHttpStatus extends Error {
	constructor(readonly status: number, readonly message: string, ...params) {
		super(...params);
	}
}

export class NotFoundException extends ErrorWithHttpStatus {
	constructor(readonly message: string, ...params) {
		super(404, message, ...params);
	}
}

export class BadRequestException extends ErrorWithHttpStatus {
	constructor(readonly message: string, ...params) {
		super(400, message, ...params);
	}
}
