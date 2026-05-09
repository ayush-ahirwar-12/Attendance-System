import { semesterService } from "../services/semester.service.js";

class semesterController{
    constructor(){
        this.semesterService = new semesterService()
    }

    create = async(req,res)=>{
        try{
            const semesterData = req.body;
            const semester = await this.semesterService.createSemester(semesterData);
            res.status(201).json(semester);
        }catch(error){
            res.status(500).json({ message: error.message });
        }
    }

    
}