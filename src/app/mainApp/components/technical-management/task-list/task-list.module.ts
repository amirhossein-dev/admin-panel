import { NgModule } from '@angular/core';
import { TaskListComponent } from './task-list.component';
import { TaskListRoutingModule } from './task-list-routing.module';
import { PrimeNgModule } from '../../utilities/primeNgModule/primeNg.Module';

@NgModule({
    declarations: [TaskListComponent],
    imports: [TaskListRoutingModule, PrimeNgModule],
})
export class TaskListModule { }
