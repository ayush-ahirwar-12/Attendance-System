class IHolidayRepository {
  async create(data) {
    throw new Error("Method not implemented");
  }

  async findBySemester(semesterId) {
    throw new Error("Method not implemented");
  }

  async getHolidayDateStrings(semesterId) {
    throw new Error("Method not implemented");
  }

  async deleteById(id) {
    throw new Error("Method not implemented");
  }
}

export default IHolidayRepository;