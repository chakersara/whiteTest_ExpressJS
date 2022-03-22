const jwt = require('jsonwebtoken')

// Sarra Chaker GLSI-B && Chaima Arfaoui GLSI-A

function verify_token(req, res, next) {
    let token = process.env.TOKEN_SECRET
    if (!token) {
        return res.status(403).send('Un token est requis.')
    }
    try {
        let decoded = jwt.verify(token, 'verysecretkey');
        req.user = decoded;
    } catch (err) {
        return res.status(403).send('Token invalide :' + err.message);
    }
    next()
}

module.exports= verify_token;