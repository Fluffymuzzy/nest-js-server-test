import {
  IsString,
  IsNumber,
  Min,
  IsNotEmpty,
  MaxLength,
  IsPositive,
  IsBoolean,
} from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: "Manufacter is required" })
  @MaxLength(50, { message: "Name must not exceed 50 characters" })
  manufacter: string;

  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  @MaxLength(50, { message: "Name must not exceed 50 characters" })
  name: string;

  @IsNumber({}, { message: "Price must be a number" })
  @IsPositive({ message: "Price must be a positive number" })
  @Min(0)
  price: number;

  @IsString()
  @IsNotEmpty({ message: "Article is required" })
  @MaxLength(50, { message: "Name must not exceed 50 characters" })
  article: string;

  @IsString()
  @IsNotEmpty({ message: "Description is required" })
  description: string;

  @IsString()
  @IsNotEmpty({ message: "Image is required" })
  images: string;

  @IsString()
  @IsNotEmpty({ message: "Type is required" })
  @MaxLength(50, { message: "Name must not exceed 50 characters" })
  type: string;

  @IsNumber({}, { message: "Capacity must be a number" })
  @IsNotEmpty({ message: "Capacity is required" })
  capacity: number;

  @IsNumber({}, { message: "Heatin element power must be a number" })
  @IsNotEmpty({ message: "Heatin element power is required" })
  heating_element_power: number;

  @IsString()
  @IsNotEmpty({ message: "Heatin element type is required" })
  @MaxLength(50, { message: "Name must not exceed 50 characters" })
  heating_element_type: string;

  @IsString()
  @IsNotEmpty({ message: "Material type is required" })
  @MaxLength(50, { message: "Name must not exceed 50 characters" })
  material: string;

  @IsString()
  @IsNotEmpty({ message: "Pipe supply is required" })
  @MaxLength(50, { message: "Name must not exceed 50 characters" })
  pipe_supply: string;

  @IsString()
  @IsNotEmpty({ message: "Installation type is required" })
  @MaxLength(50, { message: "Name must not exceed 50 characters" })
  installation: string;

  @IsNumber({}, { message: "Indicate how much is available" })
  @IsPositive({ message: "Must be a positive number" })
  @Min(0)
  in_stock: number;

  @IsBoolean()
  bestsellers: boolean;
}
