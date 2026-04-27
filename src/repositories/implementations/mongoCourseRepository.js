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
    let courses = await courseModel.find({ teacher: teacherId })
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
    class: {
      $arrayElemAt: [
        {
          $map: {
            input: "$class",
            as: "c",
            in: "$$c.name"
          }
        },
        0
      ]
    },
    teacher: {
      $arrayElemAt: [
        {
          $map: {
            input: "$teacher",
            as: "t",
            in: {
              $concat: ["$$t.firstName", " ", "$$t.lastName"]
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
}

export default mongoCourseRepository
