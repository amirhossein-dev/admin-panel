import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { AccordionModule } from 'primeng/accordion'
import { DividerModule } from 'primeng/divider'
import { SplitterModule } from 'primeng/splitter'
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { PersianDateConvertor } from '../pipes/persianDate.pipe';
import { SpeedDialModule } from "primeng/speeddial";
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';


import { UserStatusPipe } from '../pipes/userStatus.pipe';
@NgModule({
    declarations: [PersianDateConvertor, UserStatusPipe],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        PanelModule,
        ButtonModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        AccordionModule,
        DividerModule,
        SplitterModule,
        PasswordModule,
        CheckboxModule,
        SpeedDialModule,
        ToastModule,
        CardModule,
        TabViewModule,
        DialogModule,
        ConfirmPopupModule,
        KeyFilterModule,
        ProgressSpinnerModule,
        DropdownModule,

    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        PanelModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        AccordionModule,
        DividerModule,
        SplitterModule,
        PasswordModule,
        CheckboxModule,
        ToastModule,
        SpeedDialModule,
        PersianDateConvertor,
        UserStatusPipe,
        CardModule,
        TabViewModule,
        DialogModule,
        ConfirmPopupModule,
        KeyFilterModule,
        ProgressSpinnerModule,
        DropdownModule,

    ],
    providers: [],
})
export class PrimeNgModule { }
