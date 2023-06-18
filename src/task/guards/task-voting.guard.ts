import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TaskVotingGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user, params } = context.switchToHttp().getRequest();
    for (const iterator of user.tasks) {
      console.log(iterator);
      if (iterator.id == params.id) {
        if (iterator.voted != true) {
          return true;
        }
      }
    }
    return false;
  }
}
