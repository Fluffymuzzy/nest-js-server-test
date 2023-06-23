import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  Response,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { LocalAuthGuard } from "./utils/local.auth.guard";
import { GoogleAuthGuard } from "./utils/google.auth.guard";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  // ----------------------
  @Post("/signup")
  @HttpCode(HttpStatus.CREATED)
  @Header("Content-Type", "application/json")
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }
  // ----------------------
  @Post("/login")
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  login(@Request() req) {
    return { admin: req.user, msg: "Logged in" };
  }
  // ----------------------
  @Get("/login-check")
  @UseGuards(AuthenticatedGuard)
  loginCheck(@Request() req) {
    return req.user;
  }
  // ----------------------
  @Get("/logout")
  logout(@Request() req) {
    req.session.destroy();
    return { msg: "session has ended" };
  }
  // ---------------------- google auth
  @Get("google/login")
  @UseGuards(GoogleAuthGuard)
  googleLogin() {}
  // ----------------------
  @Get("google/redirect")
  @UseGuards(GoogleAuthGuard)
  googleRedirect(@Request() req) {
    console.log(req.sessionID);
    console.log(req.session);
    console.log(req.user);
    return this.adminService.googleAuthLogin(req);
  }
  // ----------------------
}
