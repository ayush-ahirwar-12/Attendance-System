class ILectureRepository {
    async bulkCreate(lectures) {
        throw new Error("Method not implemented");
    }

    async findTodayByTeacher(teacherId) {
        throw new Error("Method not implemented");
    }

    async findWeekByTeacher(teacherId) {
        throw new Error("Method not implemented");
    }

    async findById(id) {
        throw new Error("Method not implemented");
    }

    async findByIdWithClass(id) {
        throw new Error("Method not implemented");
    }

    async findByTeacherAndId(teacherId, lectureId) {
        throw new Error("Method not implemented");
    }

    async findScheduledByTeacherAndId(teacherId, lectureId) {
        throw new Error("Method not implemented");
    }

    async findCompletedByCourse(courseId) {
        throw new Error("Method not implemented");
    }

    async updateTopic(id, topic) {
        throw new Error("Method not implemented");
    }

    async updateStatus(id, status) {
        throw new Error("Method not implemented");
    }

    async cancelLecture(id, cancelledBy) {
        throw new Error("Method not implemented");
    }

    async create(data) {
        throw new Error("Method not implemented");
    }

    async createLecture(lectureData) {
        throw new Error("Method not implemented");
    }
}

export default ILectureRepository;