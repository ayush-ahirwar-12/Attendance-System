import courseService from "../services/course.service.js";

class courseController {
    constructor() {
        this.courseService = new courseService();
    }
    create = async (req, res, next) => {
        try {
            let data = req.body;
            let course = await this.courseService.createCourse(data);
            res.status(201).json({
                success:true,
                data:course
            })
        } catch (error) {
            next(error)
        }

    }
}

export default new courseController();