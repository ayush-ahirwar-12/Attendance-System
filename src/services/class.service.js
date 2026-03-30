import mongoClassRepository from "../repositories/implementations/mongoClassRepository";

class classService{
    constructor(){
        this.mongoClassRepository = new mongoClassRepository();
    }
    async createClass(data){
        let classData = this.mongoClassRepository.createClass(data);
        return classData;
    }
}

export default classService;