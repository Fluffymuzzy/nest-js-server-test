import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AdminModule } from "src/admin/admin.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { SessionSerializer } from "./session.serializer";

@Module({
  imports: [AdminModule, PassportModule.register({ session: true })],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
