import qrService from "../services/qr.service.js";

class qrController{
    constructor(){
        this.qrService = new qrService();
    }
    generateQr=async(req,res,next)=>{
        try {
            const {courseId,duration} = req.body;
            const teacherId = req.userId;
            const {qrToken,expiresAt} = await this.qrService.generateQr(courseId,duration,teacherId);            
            res.status(201).json({
                success:true,
                data:{
                    qrToken,
                    expiresAt
                }
            })

        } catch (error) {
            next(error)
        }
    }
}

export default new qrController();