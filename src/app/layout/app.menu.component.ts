import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [
        {
            label: '',
            items: [
                {
                    label: 'بیمه نامه های من (اعلام خسارت)',
                    routerLink: '/#',
                },
                {
                    label: 'خسارت های من',
                    routerLink: '/#',
                },
                {
                    label: 'تمدید بیمه نامه',
                    routerLink: '/#',
                },
                {
                    label: 'امتیازات من',
                    routerLink: '/#',
                },
                {
                    label: 'پیام رسان',
                    routerLink: '/#',
                },
            ],
        },
    ];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {}
}
