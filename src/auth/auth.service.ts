import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto) {
    try {
      const { password, ...body } = registerDto;
      const checkEmail = await this.prisma.users.findFirst({
        where: { email: registerDto.email },
      });
      const checkUsername = await this.prisma.users.findFirst({
        where: { email: registerDto.username },
      });
      if (checkEmail) throw new BadRequestException('Email already exists');
      if (checkUsername)
        throw new BadRequestException('Username already exists');
      const hashedPass = await bcrypt.hash(password, 12);
      const data = await this.prisma.users.create({
        data: { ...body, password_hash: hashedPass },
      });
      return { ...data };
    } catch (error) {
      throw new InternalServerErrorException(`Xatolik: ${error.message}`);
    }
  }
  async login(loginDto: LoginDto) {
    try {
      const checkUser = await this.prisma.users.findFirst({
        where: { email: loginDto.email },
        include: {
          UserSubscriptions: {
            include: {
              plan: { select: { id: true, name: true, duration_days: true } },
            },
          },
        },
      });
      if (!checkUser)
        throw new UnauthorizedException('Email or password invalid');
      const checkPass = await bcrypt.compare(
        loginDto.password,
        checkUser?.password_hash,
      );
      if (!checkPass)
        throw new UnauthorizedException('Email or password invalid');
      const payload = {
        id: checkUser.id,
        role: checkUser.role,
      };
      const access_token = await this.jwtService.signAsync(payload, {
        expiresIn: '2h',
      });
      const refresh_token = await this.jwtService.signAsync(payload, {
        expiresIn: '4h',
      });
      const { UserSubscriptions, ...data } = checkUser;
      const [{ plan }] = UserSubscriptions;

      return { ...data, plan, access_token, refresh_token };
    } catch (error) {
      throw new InternalServerErrorException(`Xatolik: ${error.message}`);
    }
  }
}
