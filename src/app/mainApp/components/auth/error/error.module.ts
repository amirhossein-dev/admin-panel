import { NgModule } from '@angular/core';
import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error.component';
import { PrimeNgModule } from 'src/app/mainApp/components/utilities/primeNgModule/primeNg.Module';

@NgModule({
    imports: [
        ErrorRoutingModule,
        PrimeNgModule
    ],
    declarations: [ErrorComponent]
})
export class ErrorModule { }
