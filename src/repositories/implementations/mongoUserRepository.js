import userModel from "../../models/user.model.js";
import IUserRepository from "../contracts/IUserRepository.js";
import { AppError } from "../../utils/errors.js";
import mongoose from "mongoose";

class MongoUserRepository extends IUserRepository {
  async createUser(data) {
    try {
      const user = new userModel(data);
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      console.error("Error creating user:", error);
    };
  };
  async findUserbyEmail(email) {
    try {
      const user = await userModel.findOne({ email });
      return user;
    } catch (error) {
      console.log("Error in finding user", error);
    };
  };


  async findUserbyId(Id) {
    const isValid = mongoose.Types.ObjectId.isValid(Id)
    if (!isValid) {
      console.log("ERROR: Invalid ObjectId format:", Id);
      return null;
    }
    const objectId = new mongoose.Types.ObjectId(Id);

    try {
      const [user] = await userModel.aggregate([
        { $match: { _id: objectId } },
        {
          $lookup: {
            from: "roles",
            localField: "roleId",
            foreignField: "_id",
            as: "role",
          },
        },
        {
          $unwind: {
            path: "$role",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            email: 1,
            password: 1,
            firstName: 1,
            lastName: 1,
            phoneNumber: 1,
            googleId: 1,
            isVerified: 1,
            role: {
              $cond: [
                { $ifNull: ["$role", false] },
                {
                  _id: "$role._id",
                  name: "$role.name",
                  description: "$role.description", // kept full description like in HEAD
                },
                null,
              ],
            },
          },
        },
        { $limit: 1 },
      ])
      return user || null;

    } catch (error) {
      console.error("Error finding user by ID:", error);
      throw new AppError("Failed to find user by ID", 500, error);
    }
  };


  async update(userId, newData) {
    try {
      return await userModel.findByIdAndUpdate(userId, newData, { new: true });
    } catch (error) {
      throw new AppError("Error in updating User", 501, error);
    };
  };
};

export default MongoUserRepository;
