import mongoClassRepository from "../repositories/implementations/mongoClassRepository.js";

class classService{
    constructor(){
        this.mongoClassRepository = new mongoClassRepository();
    }
    async createClass(data){
        let classData = this.mongoClassRepository.createClass(data);
        return classData;
    }
    async getAllClassOfUser(userId){
        return await this.mongoClassRepository.getAllClassOfUser(userId);
    }
    async getClass(classId){
        return await this.mongoClassRepository.getClass(classId);
    }
    async getAllClass(){
        return await this.mongoClassRepository.getAllClass();
    }
    async updateClass(classId, data){
        return await this.mongoClassRepository.updateClass(classId, data);
    }
    async deleteClass(classId){
        if(!classId){
            throw new AppError("Class id is required",400);
        }
        return await this.mongoClassRepository.deleteClass(classId);
    }
}

export default classService;