import { IsNumber, Min, IsDate } from "class-validator";

export class CreateSaleDto {
  @IsNumber()
  productId: number;

  @IsDate()
  saleDate: Date;

  @IsNumber()
  @Min(1)
  quantity: number;
}
