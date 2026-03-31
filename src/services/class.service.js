import mongoClassRepository from "../repositories/implementations/mongoClassRepository.js";

class classService{
    constructor(){
        this.mongoClassRepository = new mongoClassRepository();
    }
    async createClass(data){
        let classData = this.mongoClassRepository.createClass(data);
        return classData;
    }
    async getClass(userId){
        return await this.mongoClassRepository.getClass(userId);
    }
}

export default classService;