import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../mainApp/service/application services/authentication.service';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.scss']
})
export class AppTopBarComponent {

    items!: MenuItem[];
    nightModeValue: boolean = false;
    scales: number[] = [12, 13, 14, 15, 16];

    set scale(_val: number) {
        this.layoutService.config.scale = _val;
    }


    get scale(): number {
        return this.layoutService.config.scale;
    }

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    imageSource: string = "assets/logo.png"
    constructor(public layoutService: LayoutService, private authenticationService: AuthenticationService, private router: Router) { }

    logout() {
        this.authenticationService.logout()
    }


    decrementScale() {
        this.scale--;
        this.applyScale();
    }

    incrementScale() {
        this.scale++;
        this.applyScale();
    }
    applyScale() {
        document.documentElement.style.fontSize = this.scale + 'px';
    }
    nightModeFunction() {
        this.layoutService.changeTheme('bootstrap4-light-blue', 'light')

    }
    dayModeFunction() {
        this.layoutService.changeTheme('bootstrap4-dark-purple', 'dark')

    }

    nightModeToggle() {
        this.nightModeValue = !this.nightModeValue;
        if (this.nightModeValue === true) {
            this.layoutService.changeTheme('bootstrap4-dark-blue', 'dark')
        } else {
            this.layoutService.changeTheme('bootstrap4-light-blue', 'light')
        }

    }

    navigate() {
        this.router.navigateByUrl('/')
    }

}
