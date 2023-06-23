import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { Admin } from "./admin.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { Profile } from "passport-google-oauth20";

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
      return { warningMessage: `admin with this name already exists!` };
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
  // ----------------------
  async findOneByEmail(email: string): Promise<Admin> {
    return this.adminModel.findOne({
      where: { email },
    });
  }
  // ----------------------
  async createAdminFromGoogle(profile: Profile): Promise<Admin | string> {
    const { displayName, emails } = profile;
    const email = emails?.[0].value;

    const existingAdmin = await this.findOneByEmail(email);

    if (existingAdmin) {
      return `Admin with this name already exists!`;
    }

    const admin = new Admin();
    admin.username = displayName;
    admin.email = email;

    const randomPassword = Math.random().toString(36).slice(-8);
    const hashedRandomPassword = await bcrypt.hash(randomPassword, 10);

    admin.password = hashedRandomPassword;

    return admin.save();
  }
  // ----------------------
  async updateAdmin(
    admin: Admin,
    createAdminDto: CreateAdminDto
  ): Promise<Admin | string> {
    const { username, email, password } = createAdminDto;

    if (username) {
      const existingByUsername = await this.findOne({ where: { username } });

      if (existingByUsername && existingByUsername.id !== admin.id) {
        return `Admin with this username already exists!`;
      }

      admin.username = username;
    }

    if (email) {
      const existingByEmail = await this.findOne({ where: { email } });

      if (existingByEmail && existingByEmail.id !== admin.id) {
        return `Email is already in use!`;
      }

      admin.email = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 9);
      admin.password = hashedPassword;
    }

    return admin.save();
  }
  // ----------------------
  googleAuthLogin(req) {
    if (!req.user) {
      return "No user from google";
    }

    return {
      message: "User information from google",
      user: req.user,
    };
  }
}
