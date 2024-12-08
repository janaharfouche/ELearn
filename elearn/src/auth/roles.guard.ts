import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles) {
            return true;  // No roles required, allow access
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        return user && requiredRoles.some(role => user.roles.includes(role));
    }
}