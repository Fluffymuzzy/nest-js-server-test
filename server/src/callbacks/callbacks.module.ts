import { Module } from "@nestjs/common";
import { CallbacksService } from "./callbacks.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Callback } from "./callback.model";
import { CallbacksController } from "./callbacks.controller";

@Module({
  imports: [SequelizeModule.forFeature([Callback])],
  controllers: [CallbacksController],
  providers: [CallbacksService],
  exports: [CallbacksService],
})
export class CallbacksModule {}
