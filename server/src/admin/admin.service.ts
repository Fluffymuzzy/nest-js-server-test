import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { Admin } from "./admin.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAdminDto } from "./dto/create-admin.dto";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin)
    private adminModel: typeof Admin
  ) {}
  // ----------------------
  findOne(filter: {
    where: { id?: string; username?: string; email?: string };
  }): Promise<Admin> {
    return this.adminModel.findOne({ ...filter });
  }
  // ----------------------
  async create(
    createAdminDto: CreateAdminDto
  ): Promise<Admin | { warningMessage: string }> {
    const admin = new Admin();
    const existingByUserName = await this.findOne({
      where: { username: createAdminDto.username },
    });
    const existingByEmail = await this.findOne({
      where: { email: createAdminDto.email },
    });

    if (existingByUserName) {
      return { warningMessage: `a admin with this name already exists!` };
    }
    if (existingByEmail) {
      return { warningMessage: `email is already in use !` };
    }

    const hashedPassword = await bcrypt.hash(createAdminDto.password, 9);

    admin.username = createAdminDto.username;
    admin.password = hashedPassword;
    admin.email = createAdminDto.email;

    return admin.save();
  }
}
