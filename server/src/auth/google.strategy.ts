import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "./auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Admin } from "src/admin/admin.model";

@Injectable()
export class AdminGoogleStrategy extends PassportStrategy(
  Strategy,
  "google-admin"
) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID:
        "120761115164-5hfcq7vvv3oqltgrs1nhb24ogs56niu0.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/admin/google/redirect",
      scope: ["profile", "email"],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile
  ) {
    console.log(profile.emails);
    try {
      const admin = await this.authService.validateGoogleAdmin(profile);
      return admin;
    } catch (err) {
      console.error(err);
    }
  }
}
// ----------------------
@Injectable()
export class UserGoogleStrategy extends PassportStrategy(
  Strategy,
  "google-user"
) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID:
        "120761115164-5hfcq7vvv3oqltgrs1nhb24ogs56niu0.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/user/google/redirect",
      scope: ["profile", "email"],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile
  ) {
    console.log(profile.emails);
    try {
      const user = await this.authService.validateGoogleUser(profile);
      return user;
    } catch (err) {
      console.error(err);
    }
  }
}
