import UserService from "../services/user.service.js";

class UserController {
    constructor() {
        this.userService = new UserService();

        this.updateUserRole = this.updateUserRole.bind(this);
    }
    async updateUserRole(req, res, next) {
        try {
            const { id } = req.params;
            const { roleId } = req.body;

            if (!roleId) {
                return res.status(400).json({
                    success: false,
                    message: "Role is required"
                });
            }

            const updatedUser = await this.userService.updateUserRole(id, roleId);

            if (!updatedUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            const safeUser = {
                _id: updatedUser._id,
                email: updatedUser.email,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                phoneNumber: updatedUser.phoneNumber,
                isVerified: updatedUser.isVerified,
                role: updatedUser.role
                    ? { _id: updatedUser.role._id, name: updatedUser.role.name }
                    : null,
            };

            return res.status(200).json({
                success: true,
                message: "User role updated successfully",
                user: safeUser,
            });
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req,res,next){
        const userData = req.body;
        const user = await this.userService.update(req.userId,userData);

        res.status(200).json({
            success:true,
            data:user,
            message:"profile updated successfully"
        })
    }
}

export default new UserController();