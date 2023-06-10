import { CreateAdminDto } from "./../admin/dto/create-admin.dto";
import { Profile } from "passport-google-oauth20";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { AdminService } from "../admin/admin.service";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService
  ) {}
  // ----------------------
  async validateAdmin(username: string, password: string) {
    const admin = await this.adminService.findOne({
      where: { username },
    });

    if (!admin) {
      throw new UnauthorizedException("invalid credentials");
    }

    const validatePassword = await bcrypt.compare(password, admin.password);

    if (!validatePassword) {
      throw new UnauthorizedException("invalid credentials");
    }

    if (admin && validatePassword) {
      return {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      };
    }
    return null;
  }
  // ----------------------
  async validateGoogleAdmin(
    accessToken: string,
    refreshToken: string,
    profile: Profile
  ) {
    const email = profile.emails[0].value;
    const admin = await this.adminService.findOneByEmail(email);

    if (!admin) {
      const newAdmin = await this.adminService.createAdminFromGoogle(profile);
      return newAdmin;
    }

    admin.username = profile.displayName;
    admin.email = profile.emails[0].value;
    await this.adminService.updateAdmin(admin, {
      username: admin.username,
      password: admin.password,
      email: admin.email,
    });

    return admin;
  }
  // ----------------------

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException("invalid credentials");
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw new UnauthorizedException("invalid credentials");
    }

    if (user && validatePassword) {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
      };
    }
    return null;
  }
}
