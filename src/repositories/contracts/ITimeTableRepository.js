class ITimeTableRepository {
    async create(data) {
        throw new Error("Method not implemented");
    }

    async findBySemester(semesterId) {
        throw new Error("Method not implemented");
    }

    async findBySemesterRaw(semesterId) {
        throw new Error("Method not implemented");
    }

    async deleteById(id) {
        throw new Error("Method not implemented");
    }
}

export default ITimeTableRepository;