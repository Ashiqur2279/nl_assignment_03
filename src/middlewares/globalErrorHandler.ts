import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import AppError from "../utils/AppError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let error = err;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    error = {
      name: "AppError",
      message: err.message,
    };
  }
  // Mongoose Validation Error
  else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Validation failed";
    error = {
      name: "ValidationError",
      errors: Object.keys(err.errors).reduce((acc, key) => {
        const errorDetails = err.errors[key];
        acc[key] = {
          message: errorDetails.message,
          name: errorDetails.name,
          kind: errorDetails.kind,
          path: errorDetails.path,
          value: errorDetails.value,
        };
        if (errorDetails.name === "ValidatorError") {
          acc[key].properties = (
            errorDetails as mongoose.Error.ValidatorError
          ).properties;
        }
        return acc;
      }, {} as any),
    };
  }
  // Mongoose Cast Error
  else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = "Invalid ID Format";
    error = {
      name: "CastError",
      message: `Invalid ID: ${err.value}`,
      path: err.path,
      value: err.value,
    };
  }
  // Mongoose Duplicate Key Error
  else if (err && err.code === 11000) {
    statusCode = 409;
    message = "Duplicate key error";
    error = {
      name: "DuplicateKeyError",
      keyValue: err.keyValue,
      message: `Duplicate value for ${Object.keys(err.keyValue)}`,
    };
  }

  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

export default globalErrorHandler;
