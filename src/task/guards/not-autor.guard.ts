import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class NotAutorGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user, params, task } = context.switchToHttp().getRequest();
    for (const iterator of user.tasks) {
      if (iterator.id == params.id) return false;
    }
    for (const iterator of task.user) {
      if (params.id ==1 ) return false;
    }
    return true;
  }
}
