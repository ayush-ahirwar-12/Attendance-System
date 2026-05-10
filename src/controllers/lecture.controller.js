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

    // LectureRequest controller methods
    createLectureRequest = async (req, res, next) => {
        try {
            const data = req.body;
            const lectureRequest = await this.lectureService.createLectureRequest(data);
            res.status(201).json({
                success: true,
                data: lectureRequest,
                message: "Lecture request created successfully"
            });
        } catch (error) {
            next(error);
        }
    };

    getPendingLectureRequests = async (req, res, next) => {
        try {
            const requests = await this.lectureService.getPendingLectureRequests();
            res.status(200).json({
                success: true,
                data: requests,
                count: requests.length
            });
        } catch (error) {
            next(error);
        }
    };

    getLectureRequestsByTeacher = async (req, res, next) => {
        try {
            const { teacherId } = req.params;
            const requests = await this.lectureService.getLectureRequestsByTeacher(teacherId);
            res.status(200).json({
                success: true,
                data: requests,
                count: requests.length
            });
        } catch (error) {
            next(error);
        }
    };

    getLectureRequestById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const request = await this.lectureService.getLectureRequestById(id);
            res.status(200).json({
                success: true,
                data: request
            });
        } catch (error) {
            next(error);
        }
    };

    updateLectureRequestStatus = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { status, reviewedBy } = req.body;
            
            if (!status || !reviewedBy) {
                return res.status(400).json({
                    success: false,
                    message: "status and reviewedBy are required"
                });
            }
            
            const request = await this.lectureService.updateLectureRequestStatus(id, status, reviewedBy);
            res.status(200).json({
                success: true,
                data: request,
                message: "Lecture request status updated successfully"
            });
        } catch (error) {
            next(error);
        }
    };
}

export default new lectureController();