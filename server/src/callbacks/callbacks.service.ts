import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Callback } from "./callback.model";
import { CreateCallbackDto } from "./dto/callback.dto";

@Injectable()
export class CallbacksService {
  constructor(
    @InjectModel(Callback)
    private callbackModel: typeof Callback
  ) {}
  // ----------------------
  async createCallback(callbackData: CreateCallbackDto): Promise<Callback> {
    return this.callbackModel.create(callbackData);
  }
  // ----------------------
  async getAllCallbacks(): Promise<Callback[]> {
    return this.callbackModel.findAll();
  }
  // ----------------------
  async getCallbackById(id: number): Promise<Callback> {
    const callback = await this.callbackModel.findByPk(id);
    if (!callback) {
      throw new NotFoundException("Not found");
    }
    return callback;
  }
  // ----------------------
  async processCallback(id: number): Promise<Callback> {
    const callback = await this.getCallbackById(id);
    if (!callback) {
      throw new NotFoundException(`Callback with ID ${id} not found`);
    }
    if (callback.processed) {
      throw new BadRequestException(
        `Callback with ID ${id} is already processed`
      );
    }
    callback.processed = true;
    callback.archived = false;
    await callback.save();
    return callback;
  }
  // ----------------------
  async archiveCallback(id: number): Promise<Callback> {
    const callback = await this.getCallbackById(id);
    if (!callback) {
      throw new NotFoundException(`Callback with ID ${id} not found`);
    }
    if (callback.archived) {
      throw new BadRequestException(
        `Callback with ID ${id} is already archived`
      );
    }
    callback.processed = true;
    callback.archived = true;
    await callback.save();
    return callback;
  }
  // ----------------------
  async deleteCallback(id: number): Promise<void | string> {
    const callback = await this.getCallbackById(id);
    await callback.destroy();
    return "Callback have been deleted";
  }
  // ----------------------
  async deleteAllCallbacks(): Promise<void | string> {
    await this.callbackModel.destroy({ truncate: true });
    return "All callbacks have been deleted";
  }
}
