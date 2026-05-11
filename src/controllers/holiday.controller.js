import holidayService from "../services/holiday.service.js";

class holidayController {
    constructor() {
        this.holidayService = new holidayService()
    }   

    create = async(req, res, next) => {
        try{
            const holidayData = req.body;
            const newHoliday = await this.holidayService.createHoliday({...holidayData,managerId:req.userId});
            res.status(201).json({
                success: true,
                data: newHoliday,
                message: "Holiday created successfully"
            });
        } catch(error){
            next(error);
        }
    }

    findBySemester = async(req, res, next) => {
        try{
            const { semesterId } = req.params;
            const holidays = await this.holidayService.findBySemester(semesterId);
            res.status(200).json({
                success: true,
                data: holidays,
                count: holidays.length
            });
        } catch(error){
            next(error);
        }
    }

    getHolidayDateStrings = async(req, res, next) => {
        try{
            const { semesterId } = req.params;
            const dateStrings = await this.holidayService.getHolidayDateStrings(semesterId);
            res.status(200).json({
                success: true,
                data: dateStrings,
                count: dateStrings.length
            });
        } catch(error){
            next(error);
        }
    }

    deleteById = async(req, res, next) => {
        try{
            const { id } = req.params;
            const holiday = await this.holidayService.deleteById(id);
            res.status(200).json({
                success: true,
                data: holiday,
                message: "Holiday deleted successfully"
            });
        } catch(error){
            next(error);
        }
    }
}

export default new holidayController();