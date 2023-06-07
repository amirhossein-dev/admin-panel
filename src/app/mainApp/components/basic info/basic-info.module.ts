import { NgModule } from "@angular/core"
import { PrimeNgModule } from "src/app/mainApp/components/utilities/primeNgModule/primeNg.Module";
import { BasicInfoRoutingModule } from "./basc-info-routing.module";
import { FiscalYearComponent } from "./fiscal-year/fiscal-year.component";


@NgModule({
    declarations: [FiscalYearComponent],
    imports: [BasicInfoRoutingModule, PrimeNgModule]

})
export class BasicInfoModule {

}
