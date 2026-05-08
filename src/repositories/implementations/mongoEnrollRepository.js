import mongoose from 'mongoose'
import { enrollmentModel } from '../../models/enrollment.model.js'
import { AppError } from '../../utils/errors.js'
import IEnrollRepository from '../contracts/IEnrollRepository.js'

class mongoEnrollRepository extends IEnrollRepository {
  async enrollStudent(enrollmentData) {
    try {
      // Check for duplicate enrollment
      const existingEnrollment = await enrollmentModel.findOne({
        student: enrollmentData.student,
        class: enrollmentData.class,
        course: enrollmentData.course || null
      })

      if (existingEnrollment) {
        throw new AppError('Student is already enrolled in this course/class', 400)
      }

      const enrollment = await enrollmentModel.create(enrollmentData)
      
      if (!enrollment) {
        throw new AppError('Error in creating enrollment', 400)
      }

      // Populate references
      await enrollment.populate('student', 'firstName lastName email')
      await enrollment.populate('class', 'name')
      await enrollment.populate('course', 'name code')
      await enrollment.populate('enrolledBy', 'firstName lastName')

      return enrollment
    } catch (error) {
      throw error
    }
  }

  async getEnrolledStudents(courseId) {
    try {
      const enrollments = await enrollmentModel.aggregate([
        {
          $match: {
            course: courseId ? mongoose.Types.ObjectId(courseId) : null,
            status: 'active'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'student',
            foreignField: '_id',
            as: 'studentInfo'
          }
        },
        {
          $lookup: {
            from: 'classes',
            localField: 'class',
            foreignField: '_id',
            as: 'classInfo'
          }
        },
        {
          $lookup: {
            from: 'courses',
            localField: 'course',
            foreignField: '_id',
            as: 'courseInfo'
          }
        },
        {
          $project: {
            _id: 1,
            student: {
              $arrayElemAt: ['$studentInfo', 0]
            },
            class: {
              $arrayElemAt: ['$classInfo', 0]
            },
            course: {
              $arrayElemAt: ['$courseInfo', 0]
            },
            status: 1,
            createdAt: 1
          }
        }
      ])

      if (!enrollments) {
        throw new AppError('Error in fetching enrolled students', 400)
      }

      return enrollments
    } catch (error) {
      throw error
    }
  }

  async getEnrollmentsByStudent(studentId) {
    try {
      const enrollments = await enrollmentModel
        .find({ student: studentId, status: 'active' })
        .populate('student', 'firstName lastName email')
        .populate('class', 'name')
        .populate('course', 'name code')
        .populate('enrolledBy', 'firstName lastName')

      if (!enrollments) {
        throw new AppError('Error in fetching enrollments', 400)
      }

      return enrollments
    } catch (error) {
      throw error
    }
  }

  async updateEnrollmentStatus(enrollmentId, status) {
    try {
      const validStatuses = ['active', 'dropped', 'completed']
      if (!validStatuses.includes(status)) {
        throw new AppError('Invalid status value', 400)
      }

      const updatedEnrollment = await enrollmentModel.findByIdAndUpdate(
        enrollmentId,
        { status },
        { new: true }
      )

      if (!updatedEnrollment) {
        throw new AppError('Enrollment not found', 404)
      }

      await updatedEnrollment.populate('student', 'firstName lastName email')
      await updatedEnrollment.populate('class', 'name')
      await updatedEnrollment.populate('course', 'name code')

      return updatedEnrollment
    } catch (error) {
      throw error
    }
  }

  async deleteEnrollment(enrollmentId) {
    try {
      const deletedEnrollment = await enrollmentModel.findByIdAndDelete(enrollmentId)

      if (!deletedEnrollment) {
        throw new AppError('Enrollment not found', 404)
      }

      return deletedEnrollment
    } catch (error) {
      throw error
    }
  }

  async getEnrollmentsByClass(classId) {
    try {
      const enrollments = await enrollmentModel
        .find({ class: classId, status: 'active' })
        .populate('student', 'firstName lastName email')
        .populate('course', 'name code')

      if (!enrollments) {
        throw new AppError('Error in fetching enrollments', 400)
      }

      return enrollments
    } catch (error) {
      throw error
    }
  }

  async getAllEnrollments() {
    try {
      const enrollments = await enrollmentModel
        .find()
        .populate('student', 'firstName lastName email')
        .populate('class', 'name')
        .populate('course', 'name code')
        .populate('enrolledBy', 'firstName lastName')
        .sort({ createdAt: -1 })

      if (!enrollments) {
        throw new AppError('Error in fetching enrollments', 400)
      }

      return enrollments
    } catch (error) {
      throw error
    }
  }
}

export default mongoEnrollRepository
