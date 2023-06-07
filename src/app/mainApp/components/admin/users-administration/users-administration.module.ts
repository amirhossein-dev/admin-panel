import { NgModule } from '@angular/core';
import { PrimeNgModule } from '../../utilities/primeNgModule/primeNg.Module';
import { UsersAdministrationComponent } from './users-administration.component';

@NgModule({
    declarations: [UsersAdministrationComponent],
    imports: [PrimeNgModule],
})
export class UsersAdministrationModule { }
