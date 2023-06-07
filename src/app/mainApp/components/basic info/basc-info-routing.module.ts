import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FiscalYearComponent } from "./fiscal-year/fiscal-year.component";
const routes: Routes = [
    { path: "fiscalYear", component: FiscalYearComponent },
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class BasicInfoRoutingModule {

}
