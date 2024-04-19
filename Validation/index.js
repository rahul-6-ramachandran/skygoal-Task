const joi = require('joi')

// Validating user entered Credentials

    const validateUser = (credentials)=>{
    const Schema = joi.object({
        Email : joi.string().required(),
        Password : joi.string().min(6)
    })
    return Schema.validateAsync(credentials)
}

module.exports = validateUser