import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { DividerModule } from 'primeng/divider';

@NgModule({
    imports: [AuthRoutingModule, DividerModule],
})
export class AuthModule {}
