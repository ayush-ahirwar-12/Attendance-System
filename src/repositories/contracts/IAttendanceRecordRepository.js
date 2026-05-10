class IAttendanceRecordRepository {
  async create(data) {
    throw new Error("Method not implemented");
  }

  async bulkCreate(records) {
    throw new Error("Method not implemented");
  }

  async findBySession(sessionId) {
    throw new Error("Method not implemented");
  }

  async findOne(sessionId, studentId) {
    throw new Error("Method not implemented");
  }

  async upsertRecord(sessionId, studentId, data) {
    throw new Error("Method not implemented");
  }

  async overrideRecord(recordId, data) {
    throw new Error("Method not implemented");
  }

  async countPresent(lectureIds, studentId) {
    throw new Error("Method not implemented");
  }

  async getMarkedStudentIds(sessionId) {
    throw new Error("Method not implemented");
  }
}

export default IAttendanceRecordRepository;
