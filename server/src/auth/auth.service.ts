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
  async validateGoogleAdmin(profile: Profile) {
    try {
      const email =
        profile.emails && profile.emails.length > 0
          ? profile.emails[0].value
          : null;

      if (!email) {
        return new UnauthorizedException("Invalid credentials");
      }

      const admin = await this.adminService.findOneByEmail(email);

      if (!admin) {
        const newAdmin = await this.adminService.createAdminFromGoogle(profile);
        return newAdmin;
      }

      admin.username = profile.displayName;
      admin.email = email;
      await this.adminService.updateAdmin(admin, {
        username: admin.username,
        password: admin.password,
        email: admin.email,
      });

      return admin;
    } catch (error) {
      console.error(error);
    }
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
  // ----------------------
  async validateGoogleUser(profile: Profile) {
    try {
      const email =
        profile.emails && profile.emails.length > 0
          ? profile.emails[0].value
          : null;

      const user = await this.userService.findOneByEmail(email);

      if (!user) {
        const newUser = await this.userService.createUserFromGoogle(profile);
        return newUser;
      }

      user.username = profile.displayName;
      user.email = email;
      await this.userService.updateUser(user, {
        username: user.username,
        password: user.password,
        email: user.email,
      });

      return user;
    } catch (error) {
      console.error(error);
    }
  }
}
