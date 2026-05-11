import semesterService from "../services/semester.service.js";

class semesterController{
    constructor(){
        this.semesterService = new semesterService()
    }

    create = async(req, res, next) => {
        try{
            const semesterData = req.body;
            const managerId = req.userId;
            const semester = await this.semesterService.createSemester({...semesterData,managerId});
            res.status(201).json({
                success: true,
                data: semester,
                message: "Semester created successfully"
            });
        } catch(error){
            next(error);
        }
    }

    findById = async(req, res, next) => {
        try{
            const { id } = req.params;
            const semester = await this.semesterService.findById(id);
            res.status(200).json({
                success: true,
                data: semester
            });
        } catch(error){
            next(error);
        }
    }

    findAll = async(req, res, next) => {
        try{
            const semesters = await this.semesterService.findAll();
            res.status(200).json({
                success: true,
                data: semesters,
                count: semesters.length
            });
        } catch(error){
            next(error);
        }
    }

    updateStatus = async(req, res, next) => {
        try{
            const { id } = req.params;
            const { status } = req.body;
            
            if(!status) {
                return res.status(400).json({
                    success: false,
                    message: "Status is required"
                });
            }
            
            const semester = await this.semesterService.updateStatus(id, status);
            res.status(200).json({
                success: true,
                data: semester,
                message: "Semester status updated successfully"
            });
        } catch(error){
            next(error);
        }
    }
}

export default new semesterController();