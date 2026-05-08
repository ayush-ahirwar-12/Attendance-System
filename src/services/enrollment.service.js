import mongoEnrollRepository from '../repositories/implementations/mongoEnrollRepository.js'
import { AppError } from '../utils/errors.js'

class enrollmentService {
  constructor() {
    this.mongoEnrollRepository = new mongoEnrollRepository()
  }

  async enrollStudent(enrollmentData) {
    try {
      // Validate required fields
      if (!enrollmentData.student) {
        throw new AppError('Student ID is required', 400)
      }

      if (!enrollmentData.class) {
        throw new AppError('Class ID is required', 400)
      }

      // Enroll the student
      const enrollment = await this.mongoEnrollRepository.enrollStudent(enrollmentData)

      return enrollment
    } catch (error) {
      throw error
    }
  }

  async getEnrolledStudents(courseId) {
    try {
      if (!courseId) {
        throw new AppError('Course ID is required', 400)
      }

      const enrollments = await this.mongoEnrollRepository.getEnrolledStudents(courseId)

      return enrollments
    } catch (error) {
      throw error
    }
  }

  async getEnrollmentsByStudent(studentId) {
    try {
      if (!studentId) {
        throw new AppError('Student ID is required', 400)
      }

      const enrollments = await this.mongoEnrollRepository.getEnrollmentsByStudent(studentId)

      return enrollments
    } catch (error) {
      throw error
    }
  }

  async updateEnrollmentStatus(enrollmentId, status) {
    try {
      if (!enrollmentId) {
        throw new AppError('Enrollment ID is required', 400)
      }

      if (!status) {
        throw new AppError('Status is required', 400)
      }

      const updatedEnrollment = await this.mongoEnrollRepository.updateEnrollmentStatus(
        enrollmentId,
        status
      )

      return updatedEnrollment
    } catch (error) {
      throw error
    }
  }

  async deleteEnrollment(enrollmentId) {
    try {
      if (!enrollmentId) {
        throw new AppError('Enrollment ID is required', 400)
      }

      await this.mongoEnrollRepository.deleteEnrollment(enrollmentId)

      return { message: 'Enrollment deleted successfully' }
    } catch (error) {
      throw error
    }
  }

  async getEnrollmentsByClass(classId) {
    try {
      if (!classId) {
        throw new AppError('Class ID is required', 400)
      }

      const enrollments = await this.mongoEnrollRepository.getEnrollmentsByClass(classId)

      return enrollments
    } catch (error) {
      throw error
    }
  }

  async getAllEnrollments() {
    try {
      const enrollments = await this.mongoEnrollRepository.getAllEnrollments()

      return enrollments
    } catch (error) {
      throw error
    }
  }
}

export default enrollmentService
