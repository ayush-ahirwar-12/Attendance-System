import classService from "../services/class.service.js"

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
}
export default new classController();