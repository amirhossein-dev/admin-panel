import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthenticationService } from 'src/app/mainApp/service/application services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {


    clientId: string = "fMhXcgdUwD5UCgTwWvitFp9IuR4a";
    clientSecret: string = "y3wVxj8ux4qRfQm3mFLO61b_1BAa";
    scope: string = `device_${window.crypto.getRandomValues(new Uint32Array(1))[0]}`;

    errorMessage: string = "";
    hide: boolean = false;
    codeSecurity: string = "";
    hashCode: string = "";
    hashImageSrc: string = "";
    isLoading: boolean = false;


    loginFormGroup = new FormGroup({
        username: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required),
        clientId: new FormControl(`${this.clientId}`),
        clientSecret: new FormControl(`${this.clientSecret}`),
        captchaValue: new FormControl("", Validators.required),
        captchaHashCode: new FormControl(`${this.hashCode}`),
    })

    constructor(public layoutService: LayoutService, private router: Router, private authenticationService: AuthenticationService) { }


    ngOnInit(): void {
        this.generateCaptcha()
    }

    showPassword() {
        this.hide = !this.hide
    }
    login() {
        this.isLoading = true;
        this.authenticationService.login(this.loginFormGroup.value, this.hashCode).subscribe(resData => {
            this.isLoading = false;
            this.router.navigateByUrl('')
        }, error => {
            this.generateCaptcha()
            this.isLoading = false;
        })
    }

    numberOnly(event: any): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;

    }
    generateCaptcha() {
        this.authenticationService.generateCaptcha().subscribe(responseData => {
            this.hashCode = responseData.result.hashCode;
            this.hashImageSrc = responseData.result.imageSrc
        });
    }
}
