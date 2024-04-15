exports.NotFoundError = class extends Error {
    constructor(message){
        super(message);
        this.name = 'NotFoundError',
        this.statusCode = 404;
    }
}

exports.BadRequestError = class extends Error {
    constructor(message){
        super(message);
        this.name = 'BadRequestError',
        this.statusCode = 400;
    }
}

exports.UnauthenticatedError = class extends Error {
    constructor(message){
        super(message);
        this.name = 'UnauthenticatedError',
        this.statusCode = 401;
    }
}

exports.UnauthorizedError = class extends Error {
    constructor(message){
        super(message);
        this.name = 'UnauthorizedError',
        this.statusCode = 403;
    }
}