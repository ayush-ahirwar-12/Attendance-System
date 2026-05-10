import timeTableService from "../services/timeTable.service";

class timeTableController{
    constructor(){
        this.timeTableService = new timeTableService()
    }

    create = async(req,res)=>{
        try{
            const timeTableData = req.body;
            const newTimeTable = await this.timeTableService.createTimeTable(timeTableData);
            res.status(201).json(newTimeTable);
        }catch(error){
            console.error('Error in create timetable controller:', error);
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal Server Error' });
        }
    }
}

export default new timeTableController();