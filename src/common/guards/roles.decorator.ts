import { RolesGuard } from './roles.guard';

export function RoleGuard(...roles: string[]) {
  return new RolesGuard(roles);
}
