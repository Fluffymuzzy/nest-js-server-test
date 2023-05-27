import { Post, Body } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./product.model";

@Controller("admin/products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() productData: Partial<Product>): Promise<Product> {
    return this.productsService.createProduct(productData);
  }
}
