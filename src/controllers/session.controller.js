import sessionService from "../services/session.service";

class sessionController{
    constructor(){
        this.sessionService = new sessionService();
    }

    generateSession=async(req,res,next)=>{
        try {
            const {courseId,duration} = req.body;
            const teacherId = req.userId;
            const {sessionToken,expiresAt} = await this.sessionService.generateSession(courseId,duration,teacherId);            
            res.status(201).json({
                success:true,
                data:{
                    sessionToken,
                    expiresAt
                }
            })

        } catch (error) {
            next(error)
        }
    }
}

export default new sessionController();