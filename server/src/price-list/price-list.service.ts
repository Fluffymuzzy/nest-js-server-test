import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PriceList } from "./price-list.model";
import { CreatePriceListDto } from "./dto/price-list.dto";

@Injectable()
export class PriceListService {
  constructor(
    @InjectModel(PriceList)
    private priceListModel: typeof PriceList
  ) {}
  // ----------------------
  async createPriceService(
    priceListData: CreatePriceListDto
  ): Promise<PriceList> {
    return this.priceListModel.create(priceListData);
  }
  // ----------------------
  async updatePriceService(
    id: number,
    priceListData: Partial<PriceList>
  ): Promise<PriceList> {
    await this.priceListModel.update(priceListData, {
      where: { id },
    });
    const updatedPriceService = await this.priceListModel.findByPk(id);
    if (!updatedPriceService) {
      throw new NotFoundException("Not found");
    }
    return updatedPriceService;
  }
  // ----------------------
  async deletePriceService(id: number): Promise<string> {
    const res = await this.priceListModel.destroy({
      where: { id },
    });
    if (res === 1) {
      return "Successfully deleted";
    } else if (res === 0) {
      return "Wasn't successfully deleted, some f***ng problems";
    }
  }
  // ----------------------
  async deleteAllPriceServices(): Promise<void | string> {
    const res = await this.priceListModel.destroy({ truncate: true });
    if (res === 1) {
      return "Successfully deleted";
    } else if (res === 0) {
      return "Wasn't successfully deleted, some f***ng problems";
    }
  }
  // ----------------------
  async getAllPriceService(): Promise<PriceList[] | string> {
    const res = await this.priceListModel.findAll();
    if (!res) {
      return "No data found";
    }
    return res;
  }
}
