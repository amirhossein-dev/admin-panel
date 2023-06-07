import { NgModule } from '@angular/core';
import { ProfileComponent } from 'src/app/mainApp/components/profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { PrimeNgModule } from '../utilities/primeNgModule/primeNg.Module';
const routes: Routes = [
    { path: '', component: ProfileComponent },
]
@NgModule({
    declarations: [ProfileComponent],
    imports: [PrimeNgModule, RouterModule.forChild(routes)],
    exports: [],
    providers: [],
})
export class ProfileModule { }
