import holidayService from "../services/holiday.service";

class holidayController {
    constructor() {
        this.holidayService = new holidayService()
    }   

    create = async(req,res)=>{
        try{
            const holidayData = req.body;
            const newHoliday = await this.holidayService.createHoliday(holidayData);
            res.status(201).json(newHoliday);
        }catch(error){
            console.error('Error in create holiday controller:', error);
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal Server Error' });
        }
    }
}

export default new holidayController();