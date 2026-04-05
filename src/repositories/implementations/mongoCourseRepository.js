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

    async getCoursesByClassId(classId){
        let courses = await courseModel.find({ class: classId });
        if(!courses){
            throw new AppError("Error in fetching courses",400);
        }
        return courses;
    }
}

export default mongoCourseRepository