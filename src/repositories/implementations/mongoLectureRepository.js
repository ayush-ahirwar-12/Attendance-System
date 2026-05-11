import ILectureRepository from "../contracts/ILecture.repository.js";
import { lectureModel } from "../../models/lecture.model.js";
import { AppError } from "../../utils/errors.js";

class mongoLectureRepository extends ILectureRepository {
    async bulkCreate(lectures) {
        try {
            return await lectureModel.insertMany(lectures);
        } catch (error) {
            console.error("Error bulk creating lectures:", error);
            throw new AppError("Failed to create lectures", 500);
        }
    }

    async findTodayByTeacher(teacherId) {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);

            return await lectureModel
                .find({
                    teacher: teacherId,
                    date: { $gte: today, $lt: tomorrow },
                    status: { $ne: "cancelled" }
                })
                .populate("course", "name code")
                .populate("class", "name section")
                .sort({ startTime: 1 });
        } catch (error) {
            console.error("Error finding today's lectures:", error);
            throw new AppError("Failed to fetch today's lectures", 500);
        }
    }

    async findWeekByTeacher(teacherId) {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const weekEnd = new Date(today);
            weekEnd.setDate(today.getDate() + 7);

            return await lectureModel
                .find({
                    teacher: teacherId,
                    date: { $gte: today, $lt: weekEnd },
                    status: { $ne: "cancelled" }
                })
                .populate("course", "name code")
                .populate("class", "name section")
                .sort({ date: 1, startTime: 1 });
        } catch (error) {
            console.error("Error finding week's lectures:", error);
            throw new AppError("Failed to fetch week's lectures", 500);
        }
    }

    async findById(id) {
        try {
            const lecture = await lectureModel.findById(id);
            if (!lecture) {
                throw new AppError("Lecture not found", 404);
            }
            return lecture;
        } catch (error) {
            console.error("Error finding lecture by ID:", error);
            if (error instanceof AppError) throw error;
            throw new AppError("Failed to fetch lecture", 500);
        }
    }

    async findByIdWithClass(id) {
        try {
            const lecture = await lectureModel
                .findById(id)
                .populate("class");
            if (!lecture) {
                throw new AppError("Lecture not found", 404);
            }
            return lecture;
        } catch (error) {
            console.error("Error finding lecture with class:", error);
            if (error instanceof AppError) throw error;
            throw new AppError("Failed to fetch lecture", 500);
        }
    }

    async findByTeacherAndId(teacherId, lectureId) {
        try {
            const lecture = await lectureModel.findOne({
                _id: lectureId,
                teacher: teacherId
            });
            if (!lecture) {
                throw new AppError("Lecture not found", 404);
            }
            return lecture;
        } catch (error) {
            console.error("Error finding lecture by teacher and ID:", error);
            if (error instanceof AppError) throw error;
            throw new AppError("Failed to fetch lecture", 500);
        }
    }

    async findScheduledByTeacherAndId(teacherId, lectureId) {
        try {
            const lecture = await lectureModel.findOne({
                _id: lectureId,
                teacher: teacherId,
                status: "scheduled"
            });
            if (!lecture) {
                throw new AppError("Scheduled lecture not found", 404);
            }
            return lecture;
        } catch (error) {
            console.error("Error finding scheduled lecture:", error);
            if (error instanceof AppError) throw error;
            throw new AppError("Failed to fetch lecture", 500);
        }
    }

    async findCompletedByCourse(courseId) {
        try {
            return await lectureModel.find({
                course: courseId,
                status: "completed"
            });
        } catch (error) {
            console.error("Error finding completed lectures:", error);
            throw new AppError("Failed to fetch completed lectures", 500);
        }
    }

    async updateTopic(id, topic) {
        try {
            const lecture = await lectureModel.findByIdAndUpdate(
                id,
                { topic },
                { new: true }
            );
            if (!lecture) {
                throw new AppError("Lecture not found", 404);
            }
            return lecture;
        } catch (error) {
            console.error("Error updating topic:", error);
            if (error instanceof AppError) throw error;
            throw new AppError("Failed to update topic", 500);
        }
    }

    async updateStatus(id, status) {
        try {
            const validStatuses = ["scheduled", "ongoing", "completed", "cancelled"];
            if (!validStatuses.includes(status)) {
                throw new AppError("Invalid status", 400);
            }
            const lecture = await lectureModel.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );
            if (!lecture) {
                throw new AppError("Lecture not found", 404);
            }
            return lecture;
        } catch (error) {
            console.error("Error updating status:", error);
            if (error instanceof AppError) throw error;
            throw new AppError("Failed to update status", 500);
        }
    }

    async cancelLecture(id, cancelledBy) {
        try {
            const lecture = await lectureModel.findByIdAndUpdate(
                id,
                { status: "cancelled", cancelledBy },
                { new: true }
            );
            if (!lecture) {
                throw new AppError("Lecture not found", 404);
            }
            return lecture;
        } catch (error) {
            console.error("Error cancelling lecture:", error);
            if (error instanceof AppError) throw error;
            throw new AppError("Failed to cancel lecture", 500);
        }
    }

    async create(data) {
        try {
            return await lectureModel.create(data);
        } catch (error) {
            console.error("Error creating lecture:", error);
            throw new AppError("Failed to create lecture", 500);
        }
    }

    // Legacy method for backward compatibility
    async createLecture(lectureData) {
        return await this.create(lectureData);
    }
}

export default mongoLectureRepository;