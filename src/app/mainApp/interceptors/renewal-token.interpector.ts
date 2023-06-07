import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../service/application services/authentication.service';

@Injectable()
export class TokenRenewalInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) {}

    tokenRenewalInProgress: boolean = false;

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // !req.url.includes('/token') &&!req.url.includes('/revoke')
        if (
            this.authService.hasTokenExpired() &&
            !req.url.includes('/Token') &&
            !req.url.includes('/revoke')
        ) {
            console.log('token expired');

            if (!this.tokenRenewalInProgress) {
                console.log('renewing');

                this.tokenRenewalInProgress = true;
                this.authService.renewToken();
                return this.authService.tokenRenewalState.pipe(
                    tap(() => {
                        this.tokenRenewalInProgress = false;
                    }),
                    switchMap((v) => {
                        return next.handle(req);
                    })
                );
            } else {
                console.log('waiting');

                return this.authService.tokenRenewalState.pipe(
                    switchMap((v) => {
                        return next.handle(req);
                    })
                );
            }
        }
        return next.handle(req);
    }
}
