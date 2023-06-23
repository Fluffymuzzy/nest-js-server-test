import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { LocalAuthGuard } from "./utils/local.auth.guard";
import { GoogleAuthGuard } from "./utils/google.auth.guard";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  // ----------------------
  @Post("/signup")
  @HttpCode(HttpStatus.CREATED)
  @Header("Content-Type", "application/json")
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  // ----------------------
  @Post("/login")
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  login(@Request() req) {
    return { user: req.user, msg: "Logged in" };
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
  googleLogin() {
    return { msg: "google" };
  }
  // ----------------------
  @Get("google/redirect")
  @UseGuards(GoogleAuthGuard)
  googleRedirect(@Request() req) {
    return { msg: "google" };
  }
}
