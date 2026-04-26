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

    async getCoursesByClassId (classId){
        if(!classId){
            throw new AppError("ClassId not provided",400);
        }
        return await this.mongoCourseRepository.getCoursesByClassId(classId);
    }

    async getCoursesByTeacherId (teacherId){
        if(!teacherId){
            throw new AppError("TeacherId not provided",400);
        }
        return await this.mongoCourseRepository.getCoursesByTeacherId(teacherId);
    }

    async getAllCourses(){
        const courses=await this.mongoCourseRepository.getAllCourses();
        if(!courses){
            throw new AppError("Error in fetching all courses",404);
        }
    }
}

export default courseService;