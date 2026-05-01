import classService from "../services/class.service.js"
import { AppError } from "../utils/errors.js";

class classController {
    constructor() {
        this.classService = new classService();
    }
    createClass = async (req, res, next) => {
        try {
            const classData = await this.classService.createClass(req.body);
            return res.status(200).json({
                succes: true,
                data: classData
            });
        } catch (error) {
            next(error);
        }
    }

    getAllClassOfUser = async (req, res, next) => {
        try {
            const userId = req.userId;
            const classes = await this.classService.getAllClassOfUser(userId);
            res.status(200).json({
                success: true,
                data: classes
            })
        } catch (error) {
            console.log(error);

            throw new AppError("error in fetching class", 500, error);
        }
    }

    getClass = async (req, res, next) => {
        try {
            const { classId } = req.params;
            const data = await this.classService.getClass(classId);
            res.status(200).json({
                success: true,
                data
            })
        } catch (error) {
            next(error)
        }
    }

    getAllClass = async(req,res,next)=>{
        try {
            const data = await this.classService.getAllClass();
            res.status(200).json({
                success:true,
                data
            })
        } catch (error) {
            next(error)
        }
    }

    updateClass = async (req, res, next) => {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updatedClass = await this.classService.updateClass(classId, updateData);
            return res.status(200).json({
                success: true,
                message: "Class updated successfully",
                data: updatedClass
            });
        } catch (error) {
            next(error);
        }
    }

}
export default new classController();