import MongoQrRepository from "../repositories/implementations/MongoQrRepository.js";
import { AppError } from "../utils/errors.js";
import crypto from "crypto";

class sessionService {
    constructor() {
        this.mongoSessionRepository = new MongoSessionRepository();
    }
    async generateSession(courseId, duration, teacherId) {
        if (!courseId || !duration) {
            throw new AppError("CourseId and duration required", 400);
        }
        const sessionToken = crypto.randomBytes(16).toString("hex");

        const expiresAt = new Date(Date.now() + duration + 1000);

        return this.mongoSessionRepository.generateSession(courseId, expiresAt, teacherId, sessionToken);
    }
}

export default sessionService;