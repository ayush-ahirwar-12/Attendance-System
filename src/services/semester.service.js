import mongoSemesterRepository from "../repositories/implementations/mongoSemesterRepository.js";

class semesterService {
  constructor() {
    this.mongoSemesterRepository = new mongoSemesterRepository();
  }

  async createSemester(semesterData) {
    return await this.mongoSemesterRepository.create(semesterData);
  }

  async create(data) {
    return await this.mongoSemesterRepository.create(data);
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