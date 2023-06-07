import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNgModule } from 'src/app/mainApp/components/utilities/primeNgModule/primeNg.Module';
import { LossCmp } from './loss.component';

@NgModule({
    declarations: [
        LossCmp
    ],
    imports: [
        RouterModule.forChild([{ path: '', component: LossCmp }]),
        PrimeNgModule,
    ]
})
export class LossModule { }
