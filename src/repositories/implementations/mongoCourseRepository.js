import { courseModel } from '../../models/course.model.js'
import { AppError } from '../../utils/errors.js'
import ICourseRepository from '../contracts/ICourseRepository.js'

class mongoCourseRepository extends ICourseRepository {
  async createCourse (data) {
    let course = await courseModel.create(data)
    if (!course) {
      throw new AppError('Error in creating course', 400)
    }
    return course
  }

  async getCoursesByClassId (classId) {
    let courses = await courseModel.find({ class: classId })
    if (!courses) {
      throw new AppError('Error in fetching courses', 400)
    }
    return courses
  }

  async getCoursesByTeacherId (teacherId) {
    let courses = await courseModel
      .find({ teacher: teacherId })
      .populate('class', 'name section')
      .populate('semester', 'name status')

    if (!courses) {
      throw new AppError('Error in fetching courses', 400)
    }
    return courses
  }

  async getAllCourses () {
    return await courseModel.aggregate([
      {
        $lookup: {
          from: 'classes',
          localField: 'class',
          foreignField: '_id',
          as: 'class'
        }
      },

      {
        $lookup: {
          from: 'users',
          localField: 'teacher',
          foreignField: '_id',
          as: 'teacher'
        }
      },

      {
        $project: {
          name: 1,
          code: 1,
          type: 1,
          class: {
            $arrayElemAt: [
              {
                $map: {
                  input: '$class',
                  as: 'c',
                  in: '$$c.name'
                }
              },
              0
            ]
          },
          teacher: {
            $arrayElemAt: [
              {
                $map: {
                  input: '$teacher',
                  as: 't',
                  in: {
                    $concat: ['$$t.firstName', ' ', '$$t.lastName']
                  }
                }
              },
              0
            ]
          }
        }
      }
    ])
  }
  async updateCourse (courseId, data) {
    const updatedCourse = await courseModel.findByIdAndUpdate(courseId, data, {
      new: true
    })
    if (!updatedCourse) {
      throw new AppError('Course not found', 404)
    }
    return updatedCourse
  }
  async deleteCourse (courseId) {
    const deletedCourse = await courseModel.findByIdAndDelete(courseId)
    if (!deletedCourse) {
      throw new AppError('Course not found', 404)
    }
    return deletedCourse
  }

  async findById(courseId,teacherId){
    const course = await courseModel.findOne({
      _id: courseId,
      teacher: teacherId
    });
    return course;
  } 
}

export default mongoCourseRepository
