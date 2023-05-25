import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(admin: any, done: (err: Error, admin: any) => void) {
    done(null, admin);
  }
  deserializeUser(payload: any, done: (err: Error, admin: any) => void) {
    done(null, payload);
  }
}
