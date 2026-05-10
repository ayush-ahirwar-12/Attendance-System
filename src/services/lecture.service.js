import mongoLectureRepository from "../repositories/implementations/mongoLectureRepository";
import MongoLectureRequestRepository from "../repositories/implementations/mongoLectureRequestRepository.js";
import { AppError } from "../utils/errors";

class lectureService{
    constructor(){
        this.lectureRepository = new mongoLectureRepository();
        this.lectureRequestRepository = new MongoLectureRequestRepository();
    }

    async createLecture(lectureData){
        if(!lectureData.name || !lectureData.code) {
            throw new AppError("Name and code are required to create a lecture.",404);
        }
        return await this.lectureRepository.createLecture(lectureData);
    }

    // LectureRequest methods
    async createLectureRequest(data) {
        return await this.lectureRequestRepository.create(data);
    }

    async getPendingLectureRequests() {
        return await this.lectureRequestRepository.findPending();
    }

    async getLectureRequestsByTeacher(teacherId) {
        return await this.lectureRequestRepository.findByTeacher(teacherId);
    }

    async getLectureRequestById(id) {
        return await this.lectureRequestRepository.findById(id);
    }

    async updateLectureRequestStatus(id, status, reviewedBy) {
        return await this.lectureRequestRepository.updateStatus(id, status, reviewedBy);
    }
}

export default lectureService;