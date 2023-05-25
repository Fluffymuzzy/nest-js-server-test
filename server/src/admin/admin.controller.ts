import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { LocalAuthGuard } from "src/auth/local.auth.guard";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("/signup")
  @HttpCode(HttpStatus.CREATED)
  @Header("Content-Type", "application/json")
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Post("/login")
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  login(@Request() req) {
    return { admin: req.admin, msg: "Logged in" };
  }
}
