import AttendanceService from "../services/attendance.service.js";

class AttendanceController {
  constructor() {
    this.attendanceService = new AttendanceService();
  }

  // Existing methods for backward compatibility
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

  // New AttendanceRecord methods
  markAttendance = async (req, res, next) => {
    try {
      const data = req.body;
      const record = await this.attendanceService.markAttendance({...data,studentId: req.userId});
      res.status(201).json({
        success: true,
        data: record,
        message: "Attendance record created successfully"
      });
    } catch (error) {
      next(error);
    }
  };//

  bulkCreateRecords = async (req, res, next) => {
    try {
      const { records } = req.body;
      if (!Array.isArray(records)) {
        return res.status(400).json({
          success: false,
          message: "Records must be an array"
        });
      }
      const createdRecords = await this.attendanceService.bulkCreateRecords(records);
      res.status(201).json({
        success: true,
        data: createdRecords,
        message: `${createdRecords.length} attendance records created successfully`
      });
    } catch (error) {
      next(error);
    }
  };

  getRecordsBySession = async (req, res, next) => {
    try {
      const { sessionId } = req.params;
      const records = await this.attendanceService.getRecordsBySession(sessionId);
      res.status(200).json({
        success: true,
        data: records,
        count: records.length
      });
    } catch (error) {
      next(error);
    }
  };

  getRecord = async (req, res, next) => {
    try {
      const { sessionId, studentId } = req.params;
      const record = await this.attendanceService.getRecord(sessionId, studentId);
      
      if (!record) {
        return res.status(404).json({
          success: false,
          message: "Attendance record not found"
        });
      }
      
      res.status(200).json({
        success: true,
        data: record
      });
    } catch (error) {
      next(error);
    }
  };

  upsertRecord = async (req, res, next) => {
    try {
      const { sessionId, studentId } = req.params;
      const data = req.body;
      const record = await this.attendanceService.upsertRecord(sessionId, studentId, data);
      res.status(200).json({
        success: true,
        data: record,
        message: "Attendance record updated successfully"
      });
    } catch (error) {
      next(error);
    }
  };

  updateRecord = async (req, res, next) => {
    try {
      const { recordId } = req.params;
      const data = req.body;
      const record = await this.attendanceService.updateRecord(recordId, data);
      res.status(200).json({
        success: true,
        data: record,
        message: "Attendance record updated successfully"
      });
    } catch (error) {
      next(error);
    }
  };

  countPresentRecords = async (req, res, next) => {
    try {
      const { lectureIds, studentId } = req.body;
      
      if (!Array.isArray(lectureIds) || !studentId) {
        return res.status(400).json({
          success: false,
          message: "lectureIds (array) and studentId are required"
        });
      }
      
      const count = await this.attendanceService.countPresentRecords(lectureIds, studentId);
      res.status(200).json({
        success: true,
        data: { count },
        message: `Found ${count} present records`
      });
    } catch (error) {
      next(error);
    }
  };

  getAttendedStudentIds = async (req, res, next) => {
    try {
      const { sessionId } = req.params;
      const studentIds = await this.attendanceService.getAttendedStudentIds(sessionId);
      res.status(200).json({
        success: true,
        data: studentIds,
        count: studentIds.length
      });
    } catch (error) {
      next(error);
    }
  };

  manuallyMarkPresent = async (req, res, next) => {
    try {
      const { sessionId} = req.params;
      const { studentId ,status} = req.body;
      const userId = req.userId; // Assuming authentication middleware sets req.userId
      const record = await this.attendanceService.manuallyMarkPresent(sessionId, studentId, status, userId);
      res.status(200).json({
        success: true,
        data: record,
        message: "Student manually marked present"
      });
    } catch (error) {
      next(error);
    }
  };

}

export default new AttendanceController();
