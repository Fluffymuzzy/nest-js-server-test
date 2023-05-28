import { Injectable } from "@nestjs/common";
import { SalesService } from "src/sales/sales.service";

@Injectable()
export class StatisticsService {
  constructor(private readonly salesService: SalesService) {}
  // ----------------------
  async calculateSalesStats(startDate: Date, endDate: Date) {
    const sales = await this.salesService.getSalesByPeriod(startDate, endDate);
    const totalSales = sales.reduce(
      (total, sale) => total + sale.price * sale.quantity,
      0
    );
    const averagePrice = totalSales / sales.length;
    return {
      totalSales,
      averagePrice,
    };
  }
}
