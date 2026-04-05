import mongoClassRepository from "../repositories/implementations/mongoClassRepository.js";

class classService{
    constructor(){
        this.mongoClassRepository = new mongoClassRepository();
    }
    async createClass(data){
        let classData = this.mongoClassRepository.createClass(data);
        return classData;
    }
    async getAllClass(userId){
        return await this.mongoClassRepository.getAllClass(userId);
    }
    async getClass(classId){
        return await this.mongoClassRepository.getClass(classId);
    }
}

export default classService;