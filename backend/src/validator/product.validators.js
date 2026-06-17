import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
  console.log("BODY:", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "validation errors",
      errors: errors.array(),
    });
  }
  next();
}

export const validationProduct = [
  body("title").trim().notEmpty().withMessage("title is required"),
  body("description").notEmpty().withMessage("description is required"),
  body("PriceAmount").notEmpty().withMessage("PriceAmount is required"),
  body("priceCurrency").notEmpty().withMessage("priceCurrency is required"),

  validateRequest,
];
