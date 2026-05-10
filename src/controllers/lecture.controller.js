import lectureService from "../services/lecture.service";

class lectureController{
    constructor(){
        this.lectureService = new lectureService()
    }

    create = async(req,res)=>{
        try{
            const lectureData = req.body;
            const newLecture = await this.lectureService.createLecture(lectureData);
            res.status(201).json(newLecture);
        }catch(error){
            console.error('Error in create lecture controller:', error);
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal Server Error' });
        }   
}
}

export default new lectureController();