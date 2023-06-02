import {
  IsString,
  IsNumber,
  Min,
  IsNotEmpty,
  MaxLength,
  IsPositive,
} from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  @MaxLength(50, { message: "Name must not exceed 50 characters" })
  name: string;

  @IsNumber({}, { message: "Price must be a number" })
  @IsPositive({ message: "Price must be a positive number" })
  @Min(0)
  price: number;

  @IsNumber({}, { message: "Quantity must be a number" })
  @IsPositive({ message: "Quantity must be a positive number" })
  @Min(0)
  quantity: number;

  @IsString()
  @IsNotEmpty({ message: "Article is required" })
  article: string;
}
