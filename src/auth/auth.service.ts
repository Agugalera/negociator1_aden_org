import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { TokenPayloadDto } from './entities/token-payload.dto';
import { LoginAuthDto } from './entities/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService, // private readonly emailsConfirmationService: EmailConfirmationsService, // private readonly emailsService: EmailsService, // private jwtService: JwtService,
  ) {}

  async signUp(createAuthDto: CreateAuthDto): Promise<User> {
    try {
      const min = 225308;
      const max = 325308;
      const createdUser = await this.usersService.create({
        ...createAuthDto,
        id_profile: 3,
        sisid: Math.floor(Math.random() * (max - min) + min),
      });
      // await this.emailsConfirmationService.sendVerificationLink(
      //   createAuthDto.email,
      // );
      const responseUser = {
        firstname: createdUser.firstname,
        lastname: createdUser.lastname,
        email: createdUser.email,
        id_profile: createdUser.id_profile,
        id: createdUser.id,
        sisid: createdUser.sisid,
        state: createdUser.state,
      };
      return responseUser;
    } catch (error) {
      switch (error.code) {
        // duplicate email
        case '23505':
          throw new ConflictException('email already excists');
          break;
        default:
          console.log('error :>> ', error);
          throw new InternalServerErrorException();
          break;
      }
    }
  }

  async signIn(
    loginAuthDto: LoginAuthDto,
  ): Promise<{ access_token: string; user: any }> {
    try {
      const { email, password } = loginAuthDto;
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(password, user.password);
      const payload: TokenPayloadDto = { email };
      return {
        user: user,
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    // const isPasswordMatching = await bcrypt.compare(
    //   plainTextPassword,
    //   hashedPassword,
    // );
    const isPasswordMatching = plainTextPassword === hashedPassword
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentialsaaa');
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
