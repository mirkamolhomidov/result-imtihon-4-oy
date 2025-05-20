import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private requiredRoles: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !user.role) {
      throw new ForbiddenException('No user or role found');
    }
    const hasRole = this.requiredRoles.includes(user.role);
    if (!hasRole) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }
    return true;
  }
}
