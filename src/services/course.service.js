import MongoAttendanceRecordRepository from '../repositories/implementations/mongoAttendanceRecordRepository.js';
import mongoCourseRepository from '../repositories/implementations/mongoCourseRepository.js'
import mongoEnrollRepository from '../repositories/implementations/mongoEnrollRepository.js';
import mongoLectureRepository from '../repositories/implementations/mongoLectureRepository.js';
import { AppError } from '../utils/errors.js'

class courseService {
  constructor () {
    this.mongoCourseRepository = new mongoCourseRepository();
    this.lectureRepo = new mongoLectureRepository()
    this.enrollmentRepo = new mongoEnrollRepository()
    this.recordRepo = new MongoAttendanceRecordRepository()
  }
  async createCourse (data) {
    if (!data) {
      throw new AppError('Data not provided to make course', 404)
    }
    return await this.mongoCourseRepository.createCourse(data)
  }

  async getCoursesByClassId (classId) {
    if (!classId) {
      throw new AppError('ClassId not provided', 400)
    }
    return await this.mongoCourseRepository.getCoursesByClassId(classId)
  }

  async getCoursesByTeacherId (teacherId) {
    if (!teacherId) {
      throw new AppError('TeacherId not provided', 400)
    }
    return await this.mongoCourseRepository.getCoursesByTeacherId(teacherId)
  }

  async getAllCourses () {
    const courses = await this.mongoCourseRepository.getAllCourses()
    if (!courses) {
      throw new AppError('Error in fetching all courses', 404)
    }
    return courses
  }

  async updateCourse (courseid, data) {
    if (!courseid) {
      throw new AppError('Course id is required', 400)
    }
    return await this.mongoCourseRepository.updateCourse(courseid, data)
  }

  async deleteCourse (courseid) {
    if (!courseid) {
      throw new AppError('Course id is required', 400)
    }
    return await this.mongoCourseRepository.deleteCourse(courseid)
  }

  async getCourseReport (courseId, teacherId) {
    const course = await this.mongoCourseRepository.findById(
      courseId,
      teacherId
    )
    if (!course) throw new Error('Course not found')

    const completedLectures = await this.lectureRepo.findCompletedByCourse(courseId)
    const lectureIds = completedLectures.map(l => l._id)
    const total = completedLectures.length

    const enrollments = await this.enrollmentRepo.getEnrollmentsByClass(course.class);

     const report = await Promise.all(
      enrollments.map(async ({ student }) => {
        const present = await this.recordRepo.countPresent(
          lectureIds,
          student._id
        );
        const percentage = this.calcAttendancePercent(present, total);
        return {
          student,
          present,
          total,
          percentage,
          isDefaulter: percentage < 75
        };
      })
    );

  }

  async getMyCourses(studentId){
    return await this.enrollmentRepo.getEnrollmentsByStudent(studentId)
  }

  


}

export default courseService;
