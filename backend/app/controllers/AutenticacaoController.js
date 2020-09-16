const jwt = require('jwt-simple');

function tokenForUser(username) {
    const timestamp = new Date().getTime();
    return jwt.encode({sub: username, iat: timestamp}, "config.secret");
}

function userFromToken(token) {
    return jwt.decode(token, "config.secret")
}

exports.login = function (req, res, next) {
    const userName = req.body.username;
    const pass = req.body.password;

    if (!userName || !pass) {
        return res.status(422).send({error: 'Você deve preencher usuário e senha'});
    }

    res.json({token: tokenForUser("Teste")});
}

exports.validateToken = function (token) {
    return userFromToken(token);
}
