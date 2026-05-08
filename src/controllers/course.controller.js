import courseService from '../services/course.service.js'
import { AppError } from '../utils/errors.js'

class courseController {
  constructor () {
    this.courseService = new courseService()
  }
  create = async (req, res, next) => {
    try {
      let data = req.body
      let course = await this.courseService.createCourse(data)
      res.status(201).json({
        success: true,
        data: course
      })
    } catch (error) {
      next(error)
    }
  }

  fetchCoursesByClassId = async (req, res, next) => {
    try {
      const { classId } = req.params
      const courses = await this.courseService.getCoursesByClassId(classId)
      res.status(200).json({
        success: true,
        data: courses
      })
    } catch (error) {
      next(error)
    }
  }

  fetchCoursesByTeacherId = async (req, res, next) => {
    try {
      const teacherId = req.userId
      const courses = await this.courseService.getCoursesByTeacherId(teacherId)
      res.status(200).json({
        success: true,
        data: courses
      })
    } catch (error) {
      next(error)
    }
  }

  getAllCourses = async (req, res, next) => {
    try {
      const courses = await this.courseService.getAllCourses()
      res.status(200).json({
        success: true,
        data: courses
      })
    } catch (error) {
      next(error)
    }
  }

  updateCourse = async(req,res,next)=>{
    try {
      const {id} = req.params;
      const data = req.body;
      const updatedCourse = await this.courseService.updateCourse(id,data);
      res.status(200).json({
        success:true,
        data:updatedCourse
      })
    } catch (error) {
      next(error);
    }
  }

  deleteCourse = async(req,res,next)=>{
    try {
      const {id} = req.params;
      await this.courseService.deleteCourse(id);
      res.status(200).json({
        success:true,
        message:"Course deleted successfully"
      })
    } catch (error) {
      next(error);
    }
}
}

export default new courseController()
