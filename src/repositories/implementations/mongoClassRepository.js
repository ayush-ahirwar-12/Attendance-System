import mongoose from "mongoose";
import { classModel } from "../../models/class.mode.js";
import { AppError } from "../../utils/errors.js";
import IClassRepository from "../contracts/IClassRepository.js";

class mongoClassRepository extends IClassRepository {
    async createClass(data) {
        let classData = await classModel.create(data);
        if (!classData) {
            throw new AppError("Error while creating class", 400);
        }
        return classData;
    }
    async getClass(userId) {
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const classes = await classModel.aggregate([
            {
                $match: {
                    $or: [
                        { teacher: userObjectId },
                        { students: userObjectId }
                    ]
                }
            },

            // 👨‍🏫 teacher populate
            {
                $lookup: {
                    from: "users",
                    localField: "teacher",
                    foreignField: "_id",
                    as: "teacher"
                }
            },
            // { $unwind: { path: "$teacher", preserveNullAndEmptyArrays: true } },

            // 👨‍🎓 students populate
            {
                $lookup: {
                    from: "users",
                    localField: "students",
                    foreignField: "_id",
                    as: "students"
                }
            },

            // 🎯 clean response
            {
                $project: {
                    name: 1,
                    location: 1,
                    teacher: {
                        $map: {
                            input: "$teacher",
                            as: "t",
                            in: {
                                _id: "$$t._id",
                                name: {
                                    $concat: ["$$t.firstName", " ", "$$t.lastName"]
                                },
                                email: "$$t.email"
                            }
                        }
                    },

                    students: {
                        $map: {
                            input: "$students",
                            as: "s",
                            in: {
                                _id: "$$s._id",
                                name: {
                                    $concat: ["$$s.firstName", " ", "$$s.lastName"]
                                },
                                email: "$$s.email"
                            }
                        }
                    }
                }
            }
        ]);

        return classes;
    }

}

export default mongoClassRepository;