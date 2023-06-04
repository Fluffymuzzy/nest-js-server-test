import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from "class-validator";

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: "Manufacter must not exceed 50 characters" })
  manufacturer?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50, { message: "Name must not exceed 50 characters" })
  name?: string;

  @IsOptional()
  @IsNumber({}, { message: "Price must be a number" })
  @IsPositive({ message: "Price must be a positive number" })
  @Min(0)
  price?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "Article is required" })
  @MaxLength(50, { message: "Name must not exceed 50 characters" })
  article?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "Description is required" })
  description?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: "Image is required" })
  images?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: "Type is required" })
  @MaxLength(50, { message: "Name must not exceed 50 characters" })
  type?: string;

  @IsOptional()
  @IsNumber({}, { message: "Capacity must be a number" })
  @IsNotEmpty({ message: "Capacity is required" })
  capacity?: number;

  @IsOptional()
  @IsNumber({}, { message: "Heatin element power must be a number" })
  @IsNotEmpty({ message: "Heatin element power is required" })
  heating_element_power?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "Heatin element type is required" })
  @MaxLength(50, { message: "Name must not exceed 50 characters" })
  heating_element_type?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "Material type is required" })
  @MaxLength(50, { message: "Name must not exceed 50 characters" })
  material?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "Pipe supply is required" })
  @MaxLength(50, { message: "Name must not exceed 50 characters" })
  pipe_supply?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "Installation type is required" })
  @MaxLength(50, { message: "Name must not exceed 50 characters" })
  installation?: string;

  @IsOptional()
  @IsNumber({}, { message: "Indicate how much is available" })
  @IsPositive({ message: "Must be a positive number" })
  @Min(0)
  in_stock?: number;

  @IsOptional()
  @IsBoolean()
  bestsellers?: boolean;
}
