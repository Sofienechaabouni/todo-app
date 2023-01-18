import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Constants } from 'src/utils/constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
//the user does not need to be authenticated in order to access the route :BY_PASS_URLS: ['/auth/login', '/user/signUp']
    for (let x = 0; x < Constants.BY_PASS_URLS.length; x++) {
      if (request.url == Constants.BY_PASS_URLS[x]) return true;
    }

    return super.canActivate(context);//en cas d'erreur on aura 401 comme rep
  }
}
