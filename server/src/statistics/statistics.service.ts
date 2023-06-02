import { Injectable } from "@nestjs/common";
import { Sales } from "src/sales/sales.model";
import { SalesService } from "src/sales/sales.service";

@Injectable()
export class StatisticsService {
  constructor(private readonly salesService: SalesService) {}
  // ----------------------
  async getSalesStatistics(
    startDate: string,
    endDate: string
  ): Promise<number> {
    const sales = await this.salesService.getAllSalesByPeriod(
      startDate,
      endDate
    );
    return sales.length;
  }
  // ----------------------
  async getSalesDetails(
    startDate: string,
    endDate: string
  ): Promise<Sales[] | string> {
    return this.salesService.getAllSalesByPeriod(startDate, endDate);
  }
  // ----------------------
  async getTotalSalesAmount(
    startDate: string,
    endDate: string
  ): Promise<number | string> {
    return this.salesService.getTotalSalesAmount(startDate, endDate);
  }
  // ----------------------
  async getTotalSoldQuantity(
    startDate: string,
    endDate: string
  ): Promise<number | string> {
    const totalQuantity = await this.salesService.getTotalSoldQuantity(
      startDate,
      endDate
    );
    return totalQuantity || "no data";
  }
  // ----------------------
}
