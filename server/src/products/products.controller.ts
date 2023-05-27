import {
  Post,
  Body,
  Put,
  Param,
  HttpCode,
  HttpStatus,
  Delete,
  Get,
} from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./product.model";

@Controller("admin/products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  // ----------------------
  @Post()
  async createProduct(@Body() productData: Partial<Product>): Promise<Product> {
    return this.productsService.createProduct(productData);
  }
  // ----------------------
  @Put(":id")
  @HttpCode(HttpStatus.OK)
  async updateProduct(
    @Param("id") id: number,
    @Body() productData: Partial<Product>
  ): Promise<Product> {
    return this.productsService.updateProduct(id, productData);
  }
  // ----------------------
  @Delete(":id")
  async deleteProduct(@Param("id") id: number): Promise<string> {
    return this.productsService.deleteProduct(id);
  }
  // ----------------------
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }
  // ----------------------
  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async getProductById(@Param("id") id: number): Promise<Product | string> {
    return this.productsService.getProductById(id);
  }
}
