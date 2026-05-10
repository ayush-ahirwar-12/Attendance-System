import timeTableService from "../services/timeTable.service.js";

class timeTableController{
    constructor(){
        this.timeTableService = new timeTableService()
    }

    create = async(req, res, next) => {
        try{
            const timeTableData = req.body;
            const newTimeTable = await this.timeTableService.createTimeTable(timeTableData);
            res.status(201).json({
                success: true,
                data: newTimeTable,
                message: "Timetable entry created successfully"
            });
        } catch(error){
            next(error);
        }
    }

    findBySemester = async(req, res, next) => {
        try{
            const { semesterId } = req.params;
            const timetables = await this.timeTableService.findBySemester(semesterId);
            res.status(200).json({
                success: true,
                data: timetables,
                count: timetables.length
            });
        } catch(error){
            next(error);
        }
    }

    findBySemesterRaw = async(req, res, next) => {
        try{
            const { semesterId } = req.params;
            const timetables = await this.timeTableService.findBySemesterRaw(semesterId);
            res.status(200).json({
                success: true,
                data: timetables,
                count: timetables.length
            });
        } catch(error){
            next(error);
        }
    }

    deleteById = async(req, res, next) => {
        try{
            const { id } = req.params;
            const timetable = await this.timeTableService.deleteById(id);
            res.status(200).json({
                success: true,
                data: timetable,
                message: "Timetable entry deleted successfully"
            });
        } catch(error){
            next(error);
        }
    }
}

export default new timeTableController();