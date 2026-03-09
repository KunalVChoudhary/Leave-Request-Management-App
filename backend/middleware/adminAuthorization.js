//middleware to check if user is admin to use a certain feature
const adminAuthorization = (req, res, next) => {

    if (req.user.role === "employer") {
        return next()
    }

    return res.status(403).json({ message: "Access denied" })
}

module.exports = { adminAuthorization }