import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateUserDto } from "./dto/create-user.dto";

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
  async create(
    createUserDto: CreateUserDto
  ): Promise<User | { warningMessage: string }> {
    const user = new User();

    const existingByEmail = await this.findOne({
      where: { email: createUserDto.email },
    });

    if (existingByEmail) {
      return { warningMessage: `email is already in use !` };
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

    user.username = createUserDto.username;
    user.password = hashedPassword;
    user.email = createUserDto.email;

    return user.save();
  }
}
