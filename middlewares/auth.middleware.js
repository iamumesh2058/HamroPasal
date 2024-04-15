const { 
    UnauthenticatedError, 
    UnauthorizedError,
} = require("../errors/custom.error");
const { verifyJWT } = require("../utils/token.utils");

exports.authenticateUser = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) throw new UnauthenticatedError("Authentication invalid");
    try {
        const {userId, role } = verifyJWT(token);
        req.user = { userId, role };
        next();
    }
    catch (error){
        if (!token) throw new UnauthenticatedError("Authentication invalid");
    }
};


exports.authorizePermissions = (...roles) => {
    return (req, res, next) => {
        roles.map((role) => {
            if(!role.includes(req.user.role)){
                throw new UnauthorizedError('Unauthorized to acess this route')
            }
        })
        next();
    }
}


// exports.checkForTestUser = (req, res, next) => {
//     if(req.user.testUser) throw new BadRequestError("Demo User. Read Only!");
//     next();
// }