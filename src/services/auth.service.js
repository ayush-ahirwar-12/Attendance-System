import jwt from "jsonwebtoken"
import config from "../config/environment.js"
import mongoose from "mongoose"
import { errorObject } from "bullmq"
import UserModel from "../models/user.model.js"

class AuthService {
  async hasPermission(userId, roleName) {
    try {
      const objectId = mongoose.Types.ObjectId.isValid(userId)
        ? new mongoose.Types.ObjectId(userId)
        : null;
      if (!objectId) {
        throw new Error("Invalid user id provide");
      }

      if (!roleName || typeof roleName !== "string") {
        throw new Error("Role name is required and must be a string");
      }
      const normalizeRoleName = roleName.trim().toLowerCase();

      const result = await UserModel.aggregate([
        {
          $match: { _id: objectId },
        },
        {
          $lookup: {
            from: "roles",
            localField: "roleId",
            foreignField: "_id",
            as: "role",
          },
        },
        {
          $unwind: { path: "$role", preserveNullAndEmptyArrays: true },
        },
        {
          $project: {
            hasPermission: {
              $cond: [
                { $eq: [{ $toLower: "$role.name" }, normalizeRoleName] },
                true,
                false,
              ],
            },
          },
        },
      ]);
      console.log(result[0]?.hasPermission);

      return result[0]?.hasPermission || false;
    } catch (error) {
      console.error("Error in hasPermission (role check):", error);
      throw new Error(`Error checking role: ${error.message}`);
    }
  }
  verifyToken(token) {
    return jwt.sign(token, config.JWT_SECRET)
  }
}

export default AuthService
