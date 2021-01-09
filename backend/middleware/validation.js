const { body } = require("express-validator");

module.exports = (options = {}) => {
    const validators = [
        body("name").trim().not().isEmpty()
            .withMessage("Name is required"),
        body("email").trim().isEmail()
            .withMessage("Please enter a valid email address"),
    ];
    if (options.password) {
        validators.push(
            body("password").trim().isLength({ min: 6 })
                .withMessage("Password must have at least 6 characters")
        );
    }
    return validators;
}