import { semesterModel } from '../models/semester.model.js'
import mongoHolidayRepository from '../repositories/implementations/mongoHolidayRepository.js'
import { AppError } from '../utils/errors.js'

class holidayService {
  constructor () {
    this.holidayRepository = new mongoHolidayRepository()
  }

  async createHoliday ({ name, date, semesterId, type, managerId }) {
    const semester = await semesterModel.findById(semesterId)
    if (!semester) throw new Error('Semester not found')

    return await this.holidayRepository.create({
      name,
      date,
      type,
      semester: semesterId,
      createdBy: managerId
    })
  }

  async findBySemester (semesterId) {
    return await this.holidayRepository.findBySemester(semesterId)
  }

  async getHolidayDateStrings (semesterId) {
    return await this.holidayRepository.getHolidayDateStrings(semesterId)
  }

  async deleteById (id) {
    return await this.holidayRepository.deleteById(id)
  }
}

export default holidayService
