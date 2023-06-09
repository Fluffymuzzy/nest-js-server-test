import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AdminModule } from "src/admin/admin.module";
import { PassportModule } from "@nestjs/passport";
import { LocalUserStrategy, LocalAdminStrategy } from "./local.strategy";
import { SessionSerializer } from "./session.serializer";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [
    AdminModule,
    UserModule,
    PassportModule.register({ session: true }),
  ],
  providers: [
    AuthService,
    LocalUserStrategy,
    LocalAdminStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
