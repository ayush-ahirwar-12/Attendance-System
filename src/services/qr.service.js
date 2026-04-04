import MongoQrRepository from "../repositories/implementations/MongoQrRepository.js";
import { AppError } from "../utils/errors.js";
import crypto from "crypto";

class qrService {
    constructor() {
        this.mongoQrRepository = new MongoQrRepository();
    }
    async generateQr(courseId, duration, teacherId) {
        if (!courseId || !duration) {
            throw new AppError("CourseId and duration required", 400);
        }
        const qrToken = crypto.randomBytes(16).toString("hex");

        const expiresAt = new Date(Date.now() + duration + 1000);

        return this.mongoQrRepository.generateQr(courseId, expiresAt, teacherId, qrToken);
    }
}

export default qrService;