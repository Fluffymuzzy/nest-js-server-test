import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { Profile } from "passport-google-oauth20";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) {}

  // ----------------------
  findOne(filter: {
    where: { id?: string; username?: string; email?: string };
  }): Promise<User> {
    return this.userModel.findOne({ ...filter });
  }
  // ----------------------
  async create(createUserDto: CreateUserDto): Promise<User | string> {
    const user = new User();

    const existingByEmail = await this.findOne({
      where: { email: createUserDto.email },
    });

    if (existingByEmail) {
      return `Email is already in use !`;
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

    user.username = createUserDto.username;
    user.password = hashedPassword;
    user.email = createUserDto.email;

    return user.save();
  }
  // ----------------------
  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({
      where: { email },
    });
  }
  // ----------------------
  async createUserFromGoogle(profile: Profile): Promise<User | string> {
    const { displayName, emails } = profile;
    const email = emails?.[0].value;

    const existingUser = await this.findOneByEmail(email);

    if (existingUser) {
      return `Users with this name already exists!`;
    }

    const user = new User();
    user.username = displayName;
    user.email = email;

    const randomPassword = Math.random().toString(36).slice(-8);
    const hashedRandomPassword = await bcrypt.hash(randomPassword, 10);

    user.password = hashedRandomPassword;

    return user.save();
  }
  // ----------------------
  async updateUser(
    user: User,
    createUserDto: CreateUserDto
  ): Promise<User | string> {
    const { username, email, password } = createUserDto;

    if (username) {
      const existingByUsername = await this.findOne({ where: { username } });

      if (existingByUsername && existingByUsername.id !== user.id) {
        return `User with this username already exists!`;
      }

      user.username = username;
    }

    if (email) {
      const existingByEmail = await this.findOne({ where: { email } });

      if (existingByEmail && existingByEmail.id !== user.id) {
        return `Email is already in use!`;
      }

      user.email = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 9);
      user.password = hashedPassword;
    }

    return user.save();
  }
}
