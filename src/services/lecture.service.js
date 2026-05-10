import mongoLectureRepository from "../repositories/implementations/mongoLectureRepository";
import { AppError } from "../utils/errors";

class lectureService{
    constructor(){
        this.lectureRepository = new mongoLectureRepository()
    }

    async createLecture(lectureData){
        if(!lectureData.name || !lectureData.code) {
            throw new AppError("Name and code are required to create a lecture.",404);
        }
        return await this.lectureRepository.createLecture(lectureData);
    }
}

export default lectureService;