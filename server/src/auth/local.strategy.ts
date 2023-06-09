import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalAdminStrategy extends PassportStrategy(
  Strategy,
  "local-admin"
) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const admin = await this.authService.validateAdmin(
      username.toLowerCase(),
      password
    );

    if (admin) {
      return admin;
    } else if (!admin) {
      throw new UnauthorizedException("Invalid credentials");
    }
  }
}
// ----------------------
@Injectable()
export class LocalUserStrategy extends PassportStrategy(
  Strategy,
  "local-user"
) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(
      username.toLowerCase(),
      password
    );

    if (user) {
      return user;
    } else if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
  }
}
