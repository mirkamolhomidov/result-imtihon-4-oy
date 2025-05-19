import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.access_token;

    if (!token) {
      throw new ForbiddenException('Resource forbidden: Token is not exists');
    }

    try {
      const secret = this.configService.get('JWT_KEY');
      const payload = jwt.verify(token, secret!) as any;

      request.user = {
        user_id: payload.id,
        role: payload.role,
      };

      return true;
    } catch (err) {
      throw new ForbiddenException('Resource forbidden: Invalid token');
    }
  }
}
