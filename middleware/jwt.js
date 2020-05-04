const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
    // next(); return
    const authHeader = req.headers.authorization
        if (!authHeader) {
        res.sendStatus(401);
        return 
    }

    // verify jwt token
    const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                res.sendStatus(403)
                return 
            }
            req.user = user;
            next();
        })
}
exports.authenticateJWT = authenticateJWT;

// generate jwt
function generateToken(user) {
    const token = jwt.sign(user, process.env.TOKEN_SECRET, {
        expiresIn: "1day",
    });
    return token;
}
exports.generateToken = generateToken;