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

    fetchCoursesByClassId = async (req, res, next) => {
        try {
            const { classId } = req.params;
            const courses = await this.courseService.getCoursesByClassId(classId);
            res.status(200).json({
                success: true,
                data: courses
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new courseController();