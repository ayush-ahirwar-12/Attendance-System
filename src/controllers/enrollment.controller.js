import enrollmentService from '../services/enrollment.service.js'
import { AppError } from '../utils/errors.js'

class enrollmentController {
  constructor() {
    this.enrollmentService = new enrollmentService()
  }

  enrollStudent = async (req, res, next) => {
    try {
      const { student, classId, courseId, enrolledBy, status } = req.body
      const userId = req.userId // from authMiddleware

      // Prepare enrollment data
      const enrollmentData = {
        student: student,
        class: classId,
        course: courseId || null,
        enrolledBy: enrolledBy || userId,
        status: status || 'active'
      }

      const enrollment = await this.enrollmentService.enrollStudent(enrollmentData)

      res.status(201).json({
        success: true,
        message: 'Student enrolled successfully',
        data: enrollment
      })
    } catch (error) {
      next(error)
    }
  }

  getEnrolledStudents = async (req, res, next) => {
    try {
      const { courseId } = req.params

      const enrollments = await this.enrollmentService.getEnrolledStudents(courseId)

      res.status(200).json({
        success: true,
        message: 'Enrolled students fetched successfully',
        data: enrollments,
        count: enrollments.length
      })
    } catch (error) {
      next(error)
    }
  }

  getStudentEnrollments = async (req, res, next) => {
    try {
      const studentId = req.userId // from authMiddleware

      const enrollments = await this.enrollmentService.getEnrollmentsByStudent(studentId)

      res.status(200).json({
        success: true,
        message: 'Student enrollments fetched successfully',
        data: enrollments,
        count: enrollments.length
      })
    } catch (error) {
      next(error)
    }
  }

  updateEnrollmentStatus = async (req, res, next) => {
    try {
      const { id } = req.params
      const { status } = req.body

      const updatedEnrollment = await this.enrollmentService.updateEnrollmentStatus(id, status)

      res.status(200).json({
        success: true,
        message: 'Enrollment status updated successfully',
        data: updatedEnrollment
      })
    } catch (error) {
      next(error)
    }
  }

  deleteEnrollment = async (req, res, next) => {
    try {
      const { id } = req.params

      await this.enrollmentService.deleteEnrollment(id)

      res.status(200).json({
        success: true,
        message: 'Enrollment deleted successfully'
      })
    } catch (error) {
      next(error)
    }
  }

  getAllEnrollments = async (req, res, next) => {
    try {
      const enrollments = await this.enrollmentService.getAllEnrollments()

      res.status(200).json({
        success: true,
        message: 'All enrollments fetched successfully',
        data: enrollments,
        count: enrollments.length
      })
    } catch (error) {
      next(error)
    }
  }

  getClassEnrollments = async (req, res, next) => {
    try {
      const { classId } = req.params

      const enrollments = await this.enrollmentService.getEnrollmentsByClass(classId)

      res.status(200).json({
        success: true,
        message: 'Class enrollments fetched successfully',
        data: enrollments,
        count: enrollments.length
      })
    } catch (error) {
      next(error)
    }
  }
}

export default new enrollmentController()
