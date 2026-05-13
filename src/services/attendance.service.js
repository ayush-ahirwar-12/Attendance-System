import { AppError } from '../utils/errors.js'
import MongoAttendanceRecordRepository from '../repositories/implementations/mongoAttendanceRecordRepository.js'
import MongoAttendanceSessionRepository from '../repositories/implementations/mongoAttendanceSessionRepository.js'
import MongoUserRepository from '../repositories/implementations/mongoUserRepository.js'

class AttendanceService {
  constructor () {
    this.attendanceRecordRepository = new MongoAttendanceRecordRepository()
    this.userRepository = new MongoUserRepository()
    this.sessionRepo = new MongoAttendanceSessionRepository()
  }

  // Existing methods for backward compatibility
  async getAttendanceBySession (qrSessionId) {
    const attendanceRecords = await this.attendanceRecordRepository.findBySession(qrSessionId)
      .populate(
        'student',
        'firstName lastName email rollNo faceDescriptor phoneNumber'
      )
      .exec()
    return attendanceRecords
  }

  async overrideStatus (attendanceId, status) {
    const validStatuses = ['present', 'absent', 'late']
    if (!validStatuses.includes(status)) {
      throw new AppError('Invalid status', 400)
    }

    const record = await attendanceModel
      .findByIdAndUpdate(attendanceId, { status }, { new: true })
      .populate('student', 'firstName lastName email rollNo')

    if (!record) {
      throw new AppError('Attendance record not found', 404)
    }
    return record
  }

  async markAllPresent (qrSessionId) {
    await attendanceModel.updateMany(
      { qrSession: qrSessionId, status: { $ne: 'present' } },
      {
        $set: {
          status: 'present',
          arrivalTime: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })
        }
      }
    )

    return await this.getAttendanceBySession(qrSessionId)
  }

  // New AttendanceRecord methods
  async markAttendance ({ qrToken, latitude, longitude, faceImage, studentId }) {
    const session = await this.sessionRepo.findByQrToken(qrToken)
    if (!session) throw new Error('Invalid or expired QR code')

    if (session.qrExpiresAt && new Date() > session.qrExpiresAt) {
      throw new Error('QR code has expired')
    }

    // Step 2: Already marked?
    const already = await this.attendanceRecordRepository.findOne(
      session._id,
      studentId
    )
    if (already) throw new Error('Attendance already marked')

    // Step 3: Location check
    const cls = session.lecture.class
    const distance = calculateDistance(
      latitude,
      longitude,
      cls.latitude,
      cls.longitude
    )

    if (distance > cls.radius) {
      throw new Error(
        `You are ${Math.round(distance)}m away. Must be within ${cls.radius}m`
      )
    }

    // Step 4: Face check
    const student = await this.userRepository.findById(studentId)
    if (!student.faceEncoding) {
      throw new Error('Face not registered. Contact admin.')
    }

    const faceResult = await verifyFace(faceImage, student.faceEncoding)
    if (!faceResult.isMatched) {
      throw new Error('Face not recognized')
    }

    return await recordRepo.create({
      session: session._id,
      lecture: session.lecture._id,
      student: studentId,
      status: 'present',
      markedBy: 'face',
      markedAt: new Date(),
      location: {
        latitude,
        longitude,
        distance: Math.round(distance),
        isWithinRadius: true
      },
      faceMatch: {
        isMatched: true,
        confidence: faceResult.confidence
      }
    })
  }

  async bulkCreateRecords (records) {
    return await this.attendanceRecordRepository.bulkCreate(records)
  }

  async getRecordsBySession (sessionId) {
    return await this.attendanceRecordRepository.findBySession(sessionId)
  }

  async getRecord (sessionId, studentId) {
    return await this.attendanceRecordRepository.findOne(sessionId, studentId)
  }

  async upsertRecord (sessionId, studentId, data) {
    return await this.attendanceRecordRepository.upsertRecord(
      sessionId,
      studentId,
      data
    )
  }

  async updateRecord (recordId, data) {
    return await this.attendanceRecordRepository.overrideRecord(recordId, data)
  }

  async countPresentRecords (lectureIds, studentId) {
    return await this.attendanceRecordRepository.countPresent(
      lectureIds,
      studentId
    )
  }

  async getAttendedStudentIds (sessionId) {
    return await this.attendanceRecordRepository.getMarkedStudentIds(sessionId)
  }

  async manualMark (sessionId, studentId, status, teacherId) {
    const session = await this.sessionRepo.findByIdAndTeacher(
      sessionId,
      teacherId
    )
    if (!session) {
      throw new AppError('Session not found', 404)
    }

    return await this.attendanceRecordRepository.upsertRecord(
      sessionId,
      studentId,
      {
        session: sessionId,
        lecture: session.lecture,
        student: studentId,
        status,
        markedBy: 'manual'
      }
    )
    // Implementation for manual marking
  }

  async overrideRecord (recordId, teacherId, status, overrideReason) {
    return await this.attendanceRecordRepository.overrideRecord(recordId, {
      status,
      overrideReason,
      overriddenBy: teacherId
    })
  }

  async getMyAttendanceReport (courseId, studentId) {
    const completedLectures = await this.lectureRepo.findCompletedByCourse(
      courseId
    )
    const lectureIds = completedLectures.map(l => l._id)
    const total = completedLectures.length

    const present = await this.attendanceRecordRepository.countPresent(
      lectureIds,
      studentId
    )
    const percentage = this.calcAttendancePercent(present, total)

    return {
      present,
      total,
      percentage,
      isDefaulter: percentage < 75
    }
  }
}

export default AttendanceService
