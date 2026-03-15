import roleModel from "../../models/role.model.js";
import { AppError } from "../../utils/errors.js";
import IRoleRepository from "../contracts/IRoleRepository.js";

class mongoRoleRepository extends IRoleRepository {
  async createRole(RoleData) {
    try {
      const role = new roleModel(RoleData);
      return await role.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new AppError("Role name already exists", 409)
      }
      throw new AppError("Failed to create role", 500);
    };
  };

  async findRoleByName(Role) {
    try {
      return await roleModel.findOne({name:Role.toLowerCase()});
      
    } catch (error) {
      throw new AppError("Failed to find role", 404);
    }
  }
}

export default mongoRoleRepository;
