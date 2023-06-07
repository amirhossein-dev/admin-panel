import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'task-list', loadChildren: () => import('./task-list/task-list.module').then(m => m.TaskListModule) }
    ])],
    exports: [RouterModule]
})
export class TechnicalManagmentRoutingModule { }
