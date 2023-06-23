import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AdminModule } from "src/admin/admin.module";
import { PassportModule } from "@nestjs/passport";
import { LocalUserStrategy, LocalAdminStrategy } from "./local.strategy";
import { SessionSerializer } from "./session.serializer";
import { UserModule } from "src/user/user.module";
import { AdminGoogleStrategy, UserGoogleStrategy } from "./google.strategy";
import { ConfigModule } from "@nestjs/config";
@Module({
  imports: [
    AdminModule,
    UserModule,
    PassportModule.register({ session: true }),
    ConfigModule.forRoot(),
  ],
  providers: [
    AuthService,
    LocalUserStrategy,
    LocalAdminStrategy,
    SessionSerializer,
    AdminGoogleStrategy,
    UserGoogleStrategy,
  ],
})
export class AuthModule {}
