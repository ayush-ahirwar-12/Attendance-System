import mongoTimeTableRepository from "../repositories/implementations/mongoTimeTableRepository";

class timeTableService{
    constructor(){
        this.timeTableRepository = new mongoTimeTableRepository()
    }

    async createTimeTable(timeTableData){
        if(!timeTableData.semester || !timeTableData.courses) {
            throw new Error("Semester and courses are required to create a timetable.");
        }
        return await this.timeTableRepository.create(timeTableData);
    }
}

export default timeTableService;