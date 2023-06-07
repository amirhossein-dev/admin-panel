import { NgModule } from '@angular/core';
import { PrimeNgModule } from '../utilities/primeNgModule/primeNg.Module';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersAdministrationModule } from './users-administration/users-administration.module';

@NgModule({
    imports: [PrimeNgModule, AdminRoutingModule, UsersAdministrationModule],
})
export class AdminModule { }
