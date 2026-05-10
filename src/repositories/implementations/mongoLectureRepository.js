import ILectureRepository from "../contracts/ILecture.repository";
import { lectureModel } from "../../models/lecture.model";


class mongoLectureRepository extends ILectureRepository{
    async createLecture(lectureData) {
        return await this.lectureModel.create(lectureData);
    }   
}

export default mongoLectureRepository;