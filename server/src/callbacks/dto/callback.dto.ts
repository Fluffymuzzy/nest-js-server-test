import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsPhoneNumber,
} from "class-validator";

export class CreateCallbackDto {
  @IsNotEmpty({ message: "Name is required" })
  @IsString()
  name: string;

  @IsNotEmpty({ message: "Phone number is required" })
  @IsString()
  @IsPhoneNumber("UA")
  phoneNumber: string;

  @IsNotEmpty({ message: "Describe ur problem here" })
  @IsString()
  @MaxLength(250, { message: "Name must not exceed 250 characters" })
  description: string;
}
