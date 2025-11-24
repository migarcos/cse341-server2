const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { 
        return next(); 
    }

    res.redirect('/auth/google'); 
    
    if (req.accepts('json')) {
        return res.status(401).json({ message: 'Begin your session.' });
    }
};

module.exports = { ensureAuthenticated };