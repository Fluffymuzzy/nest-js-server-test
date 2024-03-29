import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "./product.model";
import { CreateProductDto } from "./dto/product.dto";
import { UpdateProductDto } from "./dto/updateProduct.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product
  ) {}
  // ----------------------
  async createProduct(productData: CreateProductDto): Promise<Product> {
    return this.productModel.create(productData);
  }
  // ----------------------
  async updateProduct(
    id: number,
    productData: UpdateProductDto
  ): Promise<Product> {
    await this.productModel.update(productData, {
      where: { id },
    });
    const updatedProduct = await this.productModel.findByPk(id);
    if (!updatedProduct) {
      throw new NotFoundException("Product not found");
    }
    return updatedProduct;
  }
  // ----------------------
  async deleteProduct(id: number): Promise<string> {
    const res = await this.productModel.destroy({
      where: { id },
    });

    if (res === 1) {
      return "the product was successfully deleted";
    } else if (res === 0) {
      return "the product wasn't successfully deleted, some f***ng problems";
    }
  }
  // ----------------------
  async deleteAllProducts(): Promise<void | string> {
    await this.productModel.destroy({ truncate: true });
    return "All data has been deleted";
  }

  // ----------------------
  async getAllProducts(): Promise<Product[]> {
    return this.productModel.findAll();
  }
  // ----------------------
  async getProductById(id: number): Promise<Product | string> {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      return "the product was not found";
    }
    return product;
  }
}
