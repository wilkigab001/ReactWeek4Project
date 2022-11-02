
//ACCESSES the .env file so that we can destructure the secret key/variable and apply it here
require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    //has both req and res but also has next to be used as a pointer for the next token(?)
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')

        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }
        //why doesn't it set token equal to anything? it just declares it as an empty string essentially. Then in the try function we see that it will be set equal to something unless not available. Then in the if statement it works out the rest.
        let token

        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }
        
        //Rejects and restricts access if there is no token available or is empty
        if (!token) {   
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }
        // next will make sure that it runs through the next function until there is no more functions.
        next()
    }
}