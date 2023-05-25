import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { AdminService } from "../admin/admin.service";

@Injectable()
export class AuthService {
  constructor(private readonly adminService: AdminService) {}

  async validate(username: string, password: string) {
    const admin = await this.adminService.findOne({
      where: { username: username },
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
        userId: admin.id,
        username: admin.username,
        email: admin.email,
      };
    }
    return null;
  }
}
