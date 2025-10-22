import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

if (!process.env.JWT_SECRET) {
  throw new UnauthorizedException('JWT_SECRET is not defined in environment variables');
}

const jwtSecret = process.env.JWT_SECRET as string;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
// This is the strategy that will be used to validate the JWT token.