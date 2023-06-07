import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { TokenService } from '../service/application services/token.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let accessToken = this.tokenService.getAccessToken();

        if (accessToken &&
            !req.url.includes('/token') &&
            !req.url.includes('/revoke')) {
            let newReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return next.handle(newReq);
        } else {
            return next.handle(req);
        }
    }
}
