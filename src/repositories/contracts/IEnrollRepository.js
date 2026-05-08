class IEnrollRepository {
  async enrollStudent(enrollmentData) {
    throw new Error('Method not implemented')
  }

  async getEnrolledStudents(courseId) {
    throw new Error('Method not implemented')
  }

  async getEnrollmentsByStudent(studentId) {
    throw new Error('Method not implemented')
  }

  async updateEnrollmentStatus(enrollmentId, status) {
    throw new Error('Method not implemented')
  }

  async deleteEnrollment(enrollmentId) {
    throw new Error('Method not implemented')
  }

  async getEnrollmentsByClass(classId) {
    throw new Error('Method not implemented')
  }
}

export default IEnrollRepository