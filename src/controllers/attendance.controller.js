import AttendanceService from "../services/attendance.service.js";

class AttendanceController {
  constructor() {
    this.attendanceService = new AttendanceService();
  }

  getAttendanceBySession = async (req, res, next) => {
    try {
      const { qrSessionId } = req.params;
      const records = await this.attendanceService.getAttendanceBySession(qrSessionId);
      res.status(200).json({
        success: true,
        data: records
      });
    } catch (error) {
      next(error);
    }
  };

  overrideStatus = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const record = await this.attendanceService.overrideStatus(id, status);
      res.status(200).json({
        success: true,
        data: record,
        message: "Attendance status updated"
      });
    } catch (error) {
      next(error);
    }
  };

  markAllPresent = async (req, res, next) => {
    try {
      const { qrSessionId } = req.params;
      const records = await this.attendanceService.markAllPresent(qrSessionId);
      res.status(200).json({
        success: true,
        data: records,
        message: "All students marked present"
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new AttendanceController();
