import MongoAttendanceRecordRepository from '../repositories/implementations/mongoAttendanceRecordRepository.js'
import MongoAttendanceSessionRepository from '../repositories/implementations/mongoAttendanceSessionRepository.js'
import mongoEnrollRepository from '../repositories/implementations/mongoEnrollRepository.js'
import mongoLectureRepository from '../repositories/implementations/mongoLectureRepository.js'
import { AppError } from '../utils/errors.js'
import crypto from 'crypto'

class sessionService {
  constructor () {
    this.mongoSessionRepository = new MongoAttendanceSessionRepository()
    this.attendanceSessionRepository = new MongoAttendanceSessionRepository()
    this.lectureRepo = new mongoLectureRepository()
    this.enrollmentRepo = new mongoEnrollRepository()
    this.attendanceRecordRepository = new MongoAttendanceRecordRepository()
  }

  async startSession ({lectureId, teacherId, method}) {
    const lecture = await this.lectureRepo.findScheduledByTeacherAndId(
      teacherId,
      lectureId
    )
    if (!lecture) throw new Error('Lecture not found or already started')

    const existingSession =
      await this.attendanceSessionRepository.findOpenByLecture(lectureId)
    if (existingSession)
      throw new Error('Session already open for this lecture')

    let qrToken = null
    let qrExpiresAt = null
    if (method === 'qr') {
      qrToken = crypto.randomBytes(32).toString('hex')
      qrExpiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 min
    }
    const session = await this.attendanceSessionRepository.create({
      lecture: lectureId,
      teacher: teacherId,
      method,
      qrToken,
      qrExpiresAt
    })

    await this.lectureRepo.updateStatus(lectureId, 'ongoing')

    return session
  }

  async getOpenSessionByLecture (lectureId) {
    return await this.attendanceSessionRepository.findOpenByLecture(lectureId)
  }

  async getSessionByIdAndTeacher (sessionId, teacherId) {
    return await this.attendanceSessionRepository.findByIdAndTeacher(
      sessionId,
      teacherId
    )
  }

  async getSessionByQrToken (qrToken) {
    return await this.attendanceSessionRepository.findByQrToken(qrToken)
  }

  async closeSession (sessionId, teacherId) {
    const session = await this.attendanceSessionRepository.closeSession(
      sessionId
    )
    if (!session) {
      throw new AppError('Session not found or already closed', 404)
    }

    const lecture = await this.lectureRepo.findByIdWithClass(session.lecture)
    const enrollments = await this.enrollmentRepo.findActiveByClass(
      lecture.class._id
    )

    const markedIds = await this.attendanceRecordRepository.getMarkedStudentIds(
      sessionId
    )

    const absentRecords = enrollments
      .filter(e => !markedIds.includes(e.student._id.toString()))
      .map(e => ({
        session: sessionId,
        lecture: session.lecture,
        student: e.student._id,
        status: 'absent',
        markedBy: 'manual',
        markedAt: new Date()
      }))

    if (absentRecords.length > 0) {
      await this.attendanceRecordRepository.bulkCreate(absentRecords)
    }
    await this.attendanceSessionRepository.closeSession(sessionId)
    await this.lectureRepo.updateStatus(session.lecture, 'completed')

    return { message: 'Session closed successfully' }
  }


}

export default sessionService
