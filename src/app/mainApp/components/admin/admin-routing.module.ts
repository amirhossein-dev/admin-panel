import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersAdministrationComponent } from "./users-administration/users-administration.component";
const routes: Routes = [
    { path: "users-administration", component: UsersAdministrationComponent },
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule {

}
