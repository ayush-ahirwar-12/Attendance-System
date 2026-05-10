class ILectureRequestRepository {
  async create(data) {
    throw new Error("Method not implemented");
  }

  async findPending() {
    throw new Error("Method not implemented");
  }

  async findByTeacher(teacherId) {
    throw new Error("Method not implemented");
  }

  async findById(id) {
    throw new Error("Method not implemented");
  }

  async updateStatus(id, status, reviewedBy) {
    throw new Error("Method not implemented");
  }
}

export default ILectureRequestRepository;
