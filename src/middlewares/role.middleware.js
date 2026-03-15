import AuthService from "../services/auth.service.js";
import { AppError } from "../utils/errors.js";

const authService = new AuthService();

export const authorize = async (role) => {
  return async (req, res, next) => {
    try {
      const permission = await authService.hasPermission(req.userId, role);
      if (!permission) {
        throw new AppError("Access denied, No permission", 403);
      }
      next();
    } catch (error) {
      next(error);
    };
  };
};


