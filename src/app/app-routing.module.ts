import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './mainApp/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './mainApp/service/guards/auth.guard';
import { ForgotPasswordComponent } from './mainApp/components/auth/forgot-password/forgot-password.component'

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                canActivate: [AuthGuard],
                children: [
                    { path: 'utilities', loadChildren: () => import('./mainApp/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'basicInfo', loadChildren: () => import('src/app/mainApp/components/basic info/basic-info.module').then(m => m.BasicInfoModule) },
                    { path: 'profile', loadChildren: () => import('src/app/mainApp/components/profile/profile.module').then(m => m.ProfileModule) },
                    { path: 'technichal-managment', loadChildren: () => import('src/app/mainApp/components/technical-management/technical-management.module').then(m => m.TechnicalManagmentModule) },
                    { path: 'admin', loadChildren: () => import('src/app/mainApp/components/admin/admin.module').then(m => m.AdminModule) }
                ]
            },
            { path: 'auth', loadChildren: () => import('./mainApp/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'forgotPassword', component: ForgotPasswordComponent },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
