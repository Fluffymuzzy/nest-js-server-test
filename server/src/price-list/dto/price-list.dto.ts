import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  Min,
} from "class-validator";

export class CreatePriceListDto {
  @IsString()
  @IsNotEmpty({ message: "Service name is required " })
  name: string;

  @IsNumber()
  @IsPositive({ message: "Price must be a positive number" })
  @Min(0)
  price: number;
}
