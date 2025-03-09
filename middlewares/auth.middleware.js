const { UnauthenticatedError, UnauthorizedError } = require("../errors/custom.error");
const { verifyJWT } = require("../utils/token.utils");


// USER AUTHENTICATION
exports.authenticateUser = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) throw new UnauthenticatedError("Authentication invalid");
    try {
        const { userId, role } = verifyJWT(token);
        req.user = { userId, role };
        next();
    } catch (error) {
        throw new UnauthenticatedError("Authentication invalid");
    }
}


// ALLOW PERMISSIONS
exports.authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError("Unauthorized to access this route");
        }
        next();
    }
}