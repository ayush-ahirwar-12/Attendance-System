import mongoSemesterRepository from "../repositories/implementations/mongoSemesterRepository";

class semesterService {
  constructor() {
    this.mongoSemesterRepository = new mongoSemesterRepository();
  }

  async createSemester(semesterData) {
    return await this.mongoSemesterRepository.createSemester(semesterData);
  }

  async findById(semesterId) {
    return await this.mongoSemesterRepository.findById(semesterId);
  }

  async findAll() {
    return await this.mongoSemesterRepository.findAll();
  }

  async updateStatus(semesterId, status) {
    return await this.mongoSemesterRepository.updateStatus(semesterId, status);
  }
}

export default semesterService;