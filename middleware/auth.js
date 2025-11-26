const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { 
        return next(); 
    }
    
    if (req.accepts('json')) {
        return res.status(401).json({
             message: 'Begin your session. Denied Access' 
        });
    }

    res.redirect('/auth/google'); 
};

module.exports = { ensureAuthenticated };