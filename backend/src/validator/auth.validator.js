import { body, validationResult } from "express-validator";

// Validation Error Handler
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

export const validateRegisterUser = [
  // Full Name
  body("fullname")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters"),

  // Email
  body("email").trim().isEmail().withMessage("Invalid email format"),

  // Mobile Number (Indian)
  body("contact")
    .notEmpty()
    .withMessage("Contact number is required")
    .matches(/^[6-9]\d{9}$/)
    .withMessage(
      "Mobile number must be 10 digits and start with 6, 7, 8, or 9",
    ),

  // Password
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .withMessage(
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
    ),
  // role
  body("isSeller").isBoolean().withMessage("role must be boolean"),

  validateRequest,
];

export const validateLoginUser = [
  body("email").trim().isEmail().withMessage("Invalid email format"),
  // Password
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .withMessage(
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
    ),
    validateRequest
];
