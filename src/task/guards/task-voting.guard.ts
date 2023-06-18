import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TaskVotingGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user, params } = context.switchToHttp().getRequest();
    console.log(user);
    for (const iterator of user.tasks) {
      if (iterator.tasks.id == params.id) {
        if (iterator.tasks.voted != true) {
          return true;
        }
      }
    }
    return false;
  }
}
