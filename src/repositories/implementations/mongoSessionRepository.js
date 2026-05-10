import { qrSessionModel } from "../../models/qr.model.js";
import { AppError } from "../../utils/errors.js";
import IQrRepository from "../contracts/IQrRepository.js";

class MongoSessionRepository extends ISessionRepository {
    async generateSession(courseId, expiresAt, teacherId, sessionToken) {
        await qrSessionModel.updateMany({ course: courseId, isActive: true },
            { isActive: false })

        const qrSession = await qrSessionModel.create({
            course: courseId,
            teacher: teacherId,
            sessionToken,
            expiresAt
        })
        console.log("qrSession----->",qrSession);
        
        if (!qrSession) {
            throw new AppError("Error in creating qrSession", 400);
        }
        return qrSession;
    }
}

export default MongoSessionRepository;