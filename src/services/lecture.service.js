import { semesterModel } from '../models/semester.model.js'
import mongoLectureRepository from '../repositories/implementations/mongoLectureRepository'
import MongoLectureRequestRepository from '../repositories/implementations/mongoLectureRequestRepository.js'
import { AppError } from '../utils/errors'

class lectureService {
  constructor () {
    this.lectureRepository = new mongoLectureRepository()
    this.lectureRequestRepository = new MongoLectureRequestRepository()
  }

  async createLecture (semesterId, managerId) {
    const semester = await semesterModel.findById(semesterId)
    if (!semester) throw new Error('Semester not found')
    if (semester.status === 'completed') {
      throw new Error('Cannot generate lectures for completed semester')
    }

    const count = await this.lectureRepository.createLecture(
      semesterId,
      semester.startDate,
      semester.endDate,
      managerId
    )

     return { count, message: `${count} lectures generated` };
  }

  // LectureRequest methods
  async createLectureRequest (teacherId,data) {
    return await this.lectureRequestRepository.create({teacher: teacherId, ...data})
  }

  async getPendingLectureRequests () {
    return await this.lectureRequestRepository.findPending();
  }

  async getLectureRequestsByTeacher (teacherId) {
    return await this.lectureRequestRepository.findByTeacher(teacherId)
  }

  async getLectureRequestById (id) {
    return await this.lectureRequestRepository.findById(id)
  }


  async reviewRequest(requestId, status, managerId) {
    const request = await this.lectureRequestRepository.findById(requestId);
    if (!request) throw new Error("Request not found");
    if (request.status !== "pending") throw new Error("Already reviewed");

    await this.lectureRequestRepository.updateStatus(requestId, status, managerId);

    // Approved extra class → lecture create karo
    if (status === "approved" && request.type === "extra") {
      await this.lectureRepository.create({
        course: request.course,
        class: request.class,
        teacher: request.teacher,
        date: request.requestedDate,
        startTime: request.requestedStartTime,
        endTime: request.requestedEndTime,
        type: "extra",
        status: "scheduled",
        approvedBy: managerId,
        createdBy: managerId    
      });
    }

    // Approved cancel → lecture cancel karo
    if (status === "approved" && request.type === "cancel") {
      await this.lectureRepository.cancelLecture(
        request.lectureToCancel,
        request.teacher
      );
    }

    return { message: `Request ${status}` };
  }

  // Lecture Repository methods
  async bulkCreateLectures(lectures) {
    return await this.lectureRepository.bulkCreate(lectures);
  }

  async getTodayLecturesByTeacher(teacherId) {
    return await this.lectureRepository.findTodayByTeacher(teacherId);
  }

  async getWeekLecturesByTeacher(teacherId) {
    return await this.lectureRepository.findWeekByTeacher(teacherId);
  }

  async getLectureById(id) {
    return await this.lectureRepository.findById(id);
  }

  async getLectureByIdWithClass(id) {
    return await this.lectureRepository.findByIdWithClass(id);
  }

  async getLectureByTeacherAndId(teacherId, lectureId) {
    return await this.lectureRepository.findByTeacherAndId(teacherId, lectureId);
  }

  async getScheduledLectureByTeacherAndId(teacherId, lectureId) {
    return await this.lectureRepository.findScheduledByTeacherAndId(teacherId, lectureId);
  }

  async getCompletedLecturesByCourse(courseId) {
    return await this.lectureRepository.findCompletedByCourse(courseId);
  }

  async updateLectureTopic(id, topic) {
    return await this.lectureRepository.updateTopic(id, topic);
  }

  async updateLectureStatus(id, status) {
    return await this.lectureRepository.updateStatus(id, status);
  }

  async cancelLectureForTeacher(id, cancelledBy) {
    return await this.lectureRepository.cancelLecture(id, cancelledBy);
  }

  async createLectureEntry(data) {
    return await this.lectureRepository.create(data);
  }
}



export default lectureService
