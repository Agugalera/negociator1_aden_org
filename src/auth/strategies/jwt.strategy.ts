import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
// import { ConfigService } from '@nestjs/config';
import { TokenPayloadResponseDto } from '../entities/token-payload-response.dto';
import { TokenPayloadDto } from '../entities/token-payload.dto';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: 'secretOrKey',
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayloadDto): Promise<User> {
    const { email } = payload;
    const user = await this.usersService.getByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}