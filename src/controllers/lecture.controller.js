import lectureService from '../services/lecture.service'

class lectureController {
  constructor () {
    this.lectureService = new lectureService()
  }

  create = async (req, res) => {
    try {
      const newLecture = await this.lectureService.createLecture(
        req.body.semesterId,
        req.userId
      )
      res.status(201).json(newLecture)
    } catch (error) {
      console.error('Error in create lecture controller:', error)
      res
        .status(error.statusCode || 500)
        .json({ message: error.message || 'Internal Server Error' })
    }
  }

  // LectureRequest controller methods
  createLectureRequest = async (req, res, next) => {
    try {
      const data = req.body
      const lectureRequest = await this.lectureService.createLectureRequest(
        data
      )
      res.status(201).json({
        success: true,
        data: lectureRequest,
        message: 'Lecture request created successfully'
      })
    } catch (error) {
      next(error)
    }
  }

  reviewRequest = async(req, res) =>{
    try {
      const result = await managerService.reviewRequest(
        req.params.id,
        req.body.status,
        req.userId
      )
      res.status(200).json({ success: true, ...result })
    } catch (e) {
      res.status(400).json({ success: false, message: e.message })
    }
  }

  getPendingLectureRequests = async (req, res, next) => {
    try {
      const requests = await this.lectureService.getPendingLectureRequests()
      res.status(200).json({
        success: true,
        data: requests,
        count: requests.length
      })
    } catch (error) {
      next(error)
    }
  }

  getLectureRequestsByTeacher = async (req, res, next) => {
    try {
      const { teacherId } = req.params
      const requests = await this.lectureService.getLectureRequestsByTeacher(
        teacherId
      )
      res.status(200).json({
        success: true,
        data: requests,
        count: requests.length
      })
    } catch (error) {
      next(error)
    }
  }

  getLectureRequestById = async (req, res, next) => {
    try {
      const { id } = req.params
      const request = await this.lectureService.getLectureRequestById(id)
      res.status(200).json({
        success: true,
        data: request
      })
    } catch (error) {
      next(error)
    }
  }

  updateLectureRequestStatus = async (req, res, next) => {
    try {
      const { id } = req.params
      const { status, reviewedBy } = req.body

      if (!status || !reviewedBy) {
        return res.status(400).json({
          success: false,
          message: 'status and reviewedBy are required'
        })
      }

      const request = await this.lectureService.updateLectureRequestStatus(
        id,
        status,
        reviewedBy
      )
      res.status(200).json({
        success: true,
        data: request,
        message: 'Lecture request status updated successfully'
      })
    } catch (error) {
      next(error)
    }
  }

  // Lecture Repository methods
  bulkCreateLectures = async (req, res, next) => {
    try {
      const { lectures } = req.body
      if (!Array.isArray(lectures)) {
        return res.status(400).json({
          success: false,
          message: 'lectures must be an array'
        })
      }
      const created = await this.lectureService.bulkCreateLectures(lectures)
      res.status(201).json({
        success: true,
        data: created,
        count: created.length,
        message: `${created.length} lectures created successfully`
      })
    } catch (error) {
      next(error)
    }
  }

  getTodayLectures = async (req, res, next) => {
    try {
      const teacherId = req.userId
      const lectures = await this.lectureService.getTodayLecturesByTeacher(
        teacherId
      )
      res.status(200).json({
        success: true,
        data: lectures,
        count: lectures.length
      })
    } catch (error) {
      next(error)
    }
  }

  getWeekLectures = async (req, res, next) => {
    try {
      const teacherId = req.userId
      const lectures = await this.lectureService.getWeekLecturesByTeacher(
        teacherId
      )
      res.status(200).json({
        success: true,
        data: lectures,
        count: lectures.length
      })
    } catch (error) {
      next(error)
    }
  }

  getLectureById = async (req, res, next) => {
    try {
      const { id } = req.params
      const lecture = await this.lectureService.getLectureById(id)
      res.status(200).json({
        success: true,
        data: lecture
      })
    } catch (error) {
      next(error)
    }
  }

  getLectureWithClass = async (req, res, next) => {
    try {
      const { id } = req.params
      const lecture = await this.lectureService.getLectureByIdWithClass(id)
      res.status(200).json({
        success: true,
        data: lecture
      })
    } catch (error) {
      next(error)
    }
  }

  getLectureByTeacherAndId = async (req, res, next) => {
    try {
      const { teacherId, lectureId } = req.params
      const lecture = await this.lectureService.getLectureByTeacherAndId(
        teacherId,
        lectureId
      )
      res.status(200).json({
        success: true,
        data: lecture
      })
    } catch (error) {
      next(error)
    }
  }

  getScheduledLecture = async (req, res, next) => {
    try {
      const { teacherId, lectureId } = req.params
      const lecture =
        await this.lectureService.getScheduledLectureByTeacherAndId(
          teacherId,
          lectureId
        )
      res.status(200).json({
        success: true,
        data: lecture
      })
    } catch (error) {
      next(error)
    }
  }

  getCompletedLectures = async (req, res, next) => {
    try {
      const { courseId } = req.params
      const lectures = await this.lectureService.getCompletedLecturesByCourse(
        courseId
      )
      res.status(200).json({
        success: true,
        data: lectures,
        count: lectures.length
      })
    } catch (error) {
      next(error)
    }
  }

  updateTopic = async (req, res, next) => {
    try {
      const { id } = req.params
      const { topic } = req.body
      if (!topic) {
        return res.status(400).json({
          success: false,
          message: 'topic is required'
        })
      }
      const lecture = await this.lectureService.updateLectureTopic(id, topic)
      res.status(200).json({
        success: true,
        data: lecture,
        message: 'Topic updated successfully'
      })
    } catch (error) {
      next(error)
    }
  }

  updateStatus = async (req, res, next) => {
    try {
      const { id } = req.params
      const { status } = req.body
      if (!status) {
        return res.status(400).json({
          success: false,
          message: 'status is required'
        })
      }
      const lecture = await this.lectureService.updateLectureStatus(id, status)
      res.status(200).json({
        success: true,
        data: lecture,
        message: 'Status updated successfully'
      })
    } catch (error) {
      next(error)
    }
  }

  cancelLecture = async (req, res, next) => {
    try {
      const { id } = req.params
      const { cancelledBy } = req.body
      if (!cancelledBy) {
        return res.status(400).json({
          success: false,
          message: 'cancelledBy is required'
        })
      }
      const lecture = await this.lectureService.cancelLectureForTeacher(
        id,
        cancelledBy
      )
      res.status(200).json({
        success: true,
        data: lecture,
        message: 'Lecture cancelled successfully'
      })
    } catch (error) {
      next(error)
    }
  }

  createLecture = async (req, res, next) => {
    try {
      const data = req.body
      const lecture = await this.lectureService.createLectureEntry(data)
      res.status(201).json({
        success: true,
        data: lecture,
        message: 'Lecture created successfully'
      })
    } catch (error) {
      next(error)
    }
  }
}

export default new lectureController()
