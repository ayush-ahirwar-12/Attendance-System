class IAttendanceSessionRepository {
  async create(data) {
    throw new Error("Method not implemented");
  }

  async findOpenByLecture(lectureId) {
    throw new Error("Method not implemented");
  }

  async findByIdAndTeacher(sessionId, teacherId) {
    throw new Error("Method not implemented");
  }

  async findByQrToken(qrToken) {
    throw new Error("Method not implemented");
  }

  async closeSession(sessionId) {
    throw new Error("Method not implemented");
  }
}

export default IAttendanceSessionRepository;
