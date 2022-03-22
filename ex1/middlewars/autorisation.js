// Sarra Chaker GLSI-B && Chaima Arfaoui GLSI-A

function check_administration(req, res, next) {
    if (req.user.role != 'admin') {
        return res.status(401).send('Accès interdit');
    }
    next();
}

module.exports= check_administration;