import { courseModel } from "../../models/course.model.js";
import { AppError } from "../../utils/errors.js";
import ICourseRepository from "../contracts/ICourseRepository.js";

class mongoCourseRepository extends ICourseRepository{
    async createCourse(data){
        let course = await courseModel.create(data);
        if(!course){
            throw new AppError("Error in creating course",400);
        }
        return course;
    }
}

export default mongoCourseRepository