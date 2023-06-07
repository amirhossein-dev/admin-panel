import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { PrimeNgModule } from 'src/app/mainApp/components/utilities/primeNgModule/primeNg.Module';

@NgModule({
    imports: [
        LoginRoutingModule,
        PrimeNgModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
