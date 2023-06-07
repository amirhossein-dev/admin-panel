
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { NotificationService } from "../service/application services/notification-service.service";

@Injectable(

)
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private notificationService: NotificationService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler) {

        return next.handle(request)
            .pipe(
                catchError((err: any) => {
                    let errorMessage = ''
                    switch (err.status) {
                        case 400:
                            errorMessage = err.error.businessErrors[0].message
                            break;
                        case 500:
                            errorMessage = "خطای داخلی سرور"
                            break;

                        case 0:
                            errorMessage = "لطفا اتصال اینترنت خود را بررسی کنید"
                            break;
                        default:
                            errorMessage = "خطایی رخ داده"
                    }
                    this.notificationService.showError(errorMessage)
                    return throwError(() => new Error(err.error.businessErrors[0].message))
                })


            )
    }
}

