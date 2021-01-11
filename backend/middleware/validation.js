const { body } = require("express-validator");

module.exports = (keys = "") => {
    const validators = [];
    const fields = keys.split(" ");
    if (fields.includes("name")) {
        validators.push(
            body("name").trim().not().isEmpty()
                .withMessage("Name is required"),
        );
    }
    if (fields.includes("email")) {
        validators.push(
            body("email").trim().isEmail()
                .withMessage("Please enter a valid email address"),
        );
    }
    if (fields.includes("password")) {
        validators.push(
            body("password").trim().isLength({ min: 6 })
                .withMessage("Password must have at least 6 characters")
        );
    }
    if (fields.includes("birthday")) {
        validators.push(
            body("birthday").optional({ nullable: true, checkFalsy: true })
                .isISO8601().toDate()
                .withMessage("Date is invalid"),
        );
    }
    if (fields.includes("message")) {
        validators.push(
            body("message").trim().not().isEmpty()
                .withMessage("Message can't be empty")
        )
    }
    return validators;
}