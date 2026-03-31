import { classModel } from "../../models/class.mode.js";
import { AppError } from "../../utils/errors.js";
import IClassRepository from "../contracts/IClassRepository.js";

class mongoClassRepository extends IClassRepository{
    async createClass(data){
        let classData = await classModel.create(data);
        if(!classData){
            throw new AppError("Error while creating class",400);
        }
        return classData;
    }
}

export default mongoClassRepository;