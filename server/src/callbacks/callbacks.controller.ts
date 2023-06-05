import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from "@nestjs/common";
import { CallbacksService } from "./callbacks.service";
import { CreateCallbackDto } from "./dto/callback.dto";
import { Callback } from "./callback.model";

@Controller("admin/callbacks")
export class CallbacksController {
  constructor(private callbacksService: CallbacksService) {}
  // ----------------------
  @Post()
  async createCallback(
    @Body(new ValidationPipe()) createCallback: CreateCallbackDto
  ) {
    return this.callbacksService.createCallback(createCallback);
  }
  // ----------------------
  @Get()
  async getAllCallbacks(): Promise<Callback[]> {
    return this.callbacksService.getAllCallbacks();
  }
  // ----------------------
  @Get(":id")
  async getCallbackById(@Param("id") id: number): Promise<Callback> {
    return this.callbacksService.getCallbackById(id);
  }
  // ----------------------
  @Patch(":id/process")
  async processCallback(@Param("id") id: number): Promise<Callback> {
    return this.callbacksService.processCallback(id);
  }
  // ----------------------
  @Patch(":id/archive")
  async archiveCallback(@Param("id") id: number): Promise<Callback> {
    return this.callbacksService.archiveCallback(id);
  }
  // ----------------------
  @Delete(":id")
  async deleteCallback(@Param("id") id: number): Promise<void | string> {
    return this.callbacksService.deleteCallback(id);
  }
  // ----------------------
  @Delete()
  async deleteAllCallbacks(): Promise<void | string> {
    return this.callbacksService.deleteAllCallbacks();
  }
}
