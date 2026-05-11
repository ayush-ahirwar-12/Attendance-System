import sessionService from "../services/session.service.js";

class sessionController {
    constructor(){
        this.sessionService = new sessionService();
    }

    // AttendanceSession methods
    createAttendanceSession = async(req, res, next) => {
        try {
            const data = req.body;
            const session = await this.sessionService.startSession(data);
            res.status(201).json({
                success: true,
                data: session,
                message: "Attendance session created successfully"
            });
        } catch (error) {
            next(error);
        }
    }

    getOpenSessionByLecture = async(req, res, next) => {
        try {
            const { lectureId } = req.params;
            const session = await this.sessionService.getOpenSessionByLecture(lectureId);
            res.status(200).json({
                success: true,
                data: session
            });
        } catch (error) {
            next(error);
        }
    }

    getSessionByTeacher = async(req, res, next) => {
        try {
            const { sessionId } = req.params;
            const teacherId = req.userId;
            const session = await this.sessionService.getSessionByIdAndTeacher(sessionId, teacherId);
            res.status(200).json({
                success: true,
                data: session
            });
        } catch (error) {
            next(error);
        }
    }

    getSessionByQrToken = async(req, res, next) => {
        try {
            const { qrToken } = req.params;
            const session = await this.sessionService.getSessionByQrToken(qrToken);
            res.status(200).json({
                success: true,
                data: session
            });
        } catch (error) {
            next(error);
        }
    }

    closeSession = async(req, res, next) => {
        try {
            const { sessionId } = req.params;
            const session = await this.sessionService.closeSession(sessionId, req.userId);
            res.status(200).json({
                success: true,
                data: session,
                message: "Attendance session closed successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new sessionController();