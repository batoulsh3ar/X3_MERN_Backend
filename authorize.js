const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.session || !req.session.user) { 
            return res.status(401).json({ message: 'Unauthorized. Please log in.' })
        }
        const { role } = req.session.user
        if (!allowedRoles.includes(role)) {
            return res.status(403).json({ message: 'Forbidden. You do not have permission to access this resource.' })
        }
        next()
    }
}

module.exports = authorize;
