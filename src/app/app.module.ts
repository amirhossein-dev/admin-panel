import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './mainApp/components/notfound/notfound.component';
import { IconService } from './mainApp/service/icon.service';
import { PrimeNgModule } from './mainApp/components/utilities/primeNgModule/primeNg.Module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './mainApp/interceptors/authenticator.interceptor';
import { ForgotPasswordComponent } from './mainApp/components/auth/forgot-password/forgot-password.component';
import { HttpErrorInterceptor } from './mainApp/interceptors/http-error-interceptor';
import { MessageService } from 'primeng/api';
import { UnauthorizedInterceptor } from './mainApp/interceptors/unathorized.interceptor';

@NgModule({
    declarations: [AppComponent, NotfoundComponent, ForgotPasswordComponent],
    imports: [AppRoutingModule, AppLayoutModule, PrimeNgModule],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        IconService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UnauthorizedInterceptor,
            multi: true,
        },
        MessageService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
