import { semesterModel } from "../../models/semester.model";

class mongoSemesterRepository {

    async createSemester(semesterData) {
        const semester = new this.semesterModel(semesterData);
        return await semester.save();
    }

    async findById(semesterId) {
        return await this.semesterModel.findById(semesterId);
    }

    async findAll() {
        return await this.semesterModel.find();
    }

    async updateStatus(semesterId, status) {
        return await this.semesterModel.findByIdAndUpdate(semesterId, { status }, { new: true });
    }
}


export default mongoSemesterRepository;