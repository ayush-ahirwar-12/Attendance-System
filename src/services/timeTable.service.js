import mongoTimeTableRepository from "../repositories/implementations/mongoTimeTableRepository.js";
import { AppError } from "../utils/errors.js";

class timeTableService{
    constructor(){
        this.timeTableRepository = new mongoTimeTableRepository()
    }

    async createTimeTable(timeTableData){
        if(!timeTableData.semester || !timeTableData.course) {
            throw new AppError("Semester and course are required to create a timetable.", 400);
        }
        return await this.timeTableRepository.create(timeTableData);
    }

    async create(data) {
        if(!data.semester || !data.course) {
            throw new AppError("Semester and course are required to create a timetable.", 400);
        }
        return await this.timeTableRepository.create(data);
    }

    async findBySemester(semesterId) {
        return await this.timeTableRepository.findBySemester(semesterId);
    }

    async findBySemesterRaw(semesterId) {
        return await this.timeTableRepository.findBySemesterRaw(semesterId);
    }

    async deleteById(id) {
        return await this.timeTableRepository.deleteById(id);
    }
}

export default timeTableService;