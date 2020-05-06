const jwt = require("jsonwebtoken");

// verify jwt token
function verifyToken(payload) {
    const token = payload.token;
    const state = jwt.verify(token, process.env.JWT, function (err) {
		if (err) {
            console.log(err);
            // console.log(token);
			return false;
		}
		return true;
	});
	return state;
}
exports.verifyToken = verifyToken;

// generate jwt
function generateToken(user) {
    const token = jwt.sign(user, process.env.TOKEN_SECRET, {
        expiresIn: "1day",
    });
    return token;
}
exports.generateToken = generateToken;