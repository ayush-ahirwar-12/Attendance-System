import mongoCourseRepository from "../repositories/implementations/mongoCourseRepository.js";
import { AppError } from "../utils/errors.js";

class courseService{
    constructor(){
        this.mongoCourseRepository = new mongoCourseRepository();
    }
    async createCourse (data){
        if(!data){
            throw new AppError("Data not provided to make course",404);
        }
        return await this.mongoCourseRepository.createCourse(data);
    }
}

export default courseService;