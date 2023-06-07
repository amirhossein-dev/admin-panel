import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IValidateOtp } from 'src/app/mainApp/interfaces/validate-otp.interface';
import { AuthenticationService } from 'src/app/mainApp/service/application services/authentication.service';
import { NotificationService } from 'src/app/mainApp/service/application services/notification-service.service';
import { UserManagerService } from 'src/app/mainApp/service/application services/user-manager.service';
import { ConfirmPasswordValidator } from 'src/app/mainApp/components/utilities/confirm-password-validator';
import { IResetPassword } from 'src/app/mainApp/interfaces/resetPassword.interface';

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
    @ViewChild('secondPartFirstInput') secondPartFirstInput!: ElementRef;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private userManagerService: UserManagerService,
        private notificationService: NotificationService
    ) {}
    hide: boolean = false;
    hideConfirm: boolean = false;
    secondPart: boolean = false;
    isLoading: boolean = false;
    isLoadingSecondPart: boolean = false;
    succesfull: boolean = false;

    hashCode: string = '';
    hashImageSrc: string = '';
    clientUuid: string = '';
    validityTime: number = 120;

    forgotPasswordFirstStep = new FormGroup({
        captchaValue: new FormControl(null, Validators.required),
        username: new FormControl('', Validators.required),
    });
    private get captchaValue(): number {
        return this.forgotPasswordFirstStep.controls.captchaValue.value!;
    }
    private get username(): string {
        return this.forgotPasswordFirstStep.controls.username.value!;
    }

    forgotPasswordSecondStep = new FormGroup(
        {
            otp: new FormControl(null, Validators.required),
            newPassword: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
            ]),
            confirmPassword: new FormControl('', Validators.required),
        },
        [
            ConfirmPasswordValidator.MatchValidator(
                'newPassword',
                'confirmPassword'
            ),
        ]
    );

    get otpValue() {
        return this.forgotPasswordSecondStep.controls.otp.value!;
    }
    get newPasswordValue() {
        return this.forgotPasswordSecondStep.controls.newPassword.value!;
    }
    passwordError: boolean = false;
    get passwordMatchError() {
        if (
            this.forgotPasswordSecondStep.controls.confirmPassword.value!
                .length > 6
        ) {
            return this.forgotPasswordSecondStep.getError('missMatch');
        }
    }

    ngOnInit(): void {
        this.generateCaptcha();
    }

    togglePassword(): void {
        this.hide = !this.hide;
    }
    toggleConfirmPassword(): void {
        this.hideConfirm = !this.hideConfirm;
    }

    navigateFunction() {
        this.router.navigateByUrl('auth/login');
        this.succesfull = false;
    }

    setFocus() {
        setTimeout(() => {
            this.secondPartFirstInput.nativeElement.focus();
        }, 0);
    }

    getOtp() {
        this.isLoading = true;
        let otpReqObj: IValidateOtp = {
            captchaHashCode: this.hashCode,
            captchaValue: this.captchaValue,
            username: this.username,
        };
        this.userManagerService.getOtp(otpReqObj).subscribe(
            (resData) => {
                switch (resData.result) {
                    case '':
                        this.generateCaptcha();
                        this.notificationService.showError(
                            'نام کاربری اشتباه می باشد'
                        );
                        this.forgotPasswordFirstStep.controls.username.invalid;
                        break;
                    default:
                        this.secondPart = true;
                        this.setFocus();
                        this.setTime();
                        break;
                }
                this.isLoading = false;
                this.secondPart = true;
                this.clientUuid = resData.result;
            },
            (error) => {
                this.isLoading = false;
                this.secondPart = false;
                this.generateCaptcha();
            }
        );
    }

    onClickValidateAndResetPassword() {
        this.isLoadingSecondPart = true;
        let resetPasswrodObject: IResetPassword = {
            otp: this.otpValue,
            uuid: this.clientUuid,
            newPassword: this.newPasswordValue,
        };
        this.userManagerService.resetPassword(resetPasswrodObject).subscribe(
            (resData) => {
                switch (resData.result) {
                    case true:
                        this.succesfull = true;
                        this.isLoadingSecondPart = false;

                        break;

                    default:
                        this.generateCaptcha();
                        this.succesfull = false;
                        this.forgotPasswordFirstStep.controls.captchaValue.reset();
                        this.forgotPasswordFirstStep.controls.username.reset();
                        this.secondPart = false;
                        this.clientUuid = '';
                        this.isLoadingSecondPart = false;

                        break;
                }
            },
            (error) => {
                this.secondPart = false;
                this.forgotPasswordSecondStep.controls.confirmPassword.reset();
                this.forgotPasswordSecondStep.controls.newPassword.reset();
                this.forgotPasswordSecondStep.controls.otp.reset();
                this.isLoadingSecondPart = false;

                console.log(error);
                this.succesfull = false;
                this.clientUuid = '';
            }
        );
    }

    numberOnly(event: any): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    generateCaptcha() {
        this.authenticationService
            .generateCaptcha()
            .subscribe((responseData) => {
                this.hashCode = responseData.result.hashCode;
                this.hashImageSrc = responseData.result.imageSrc;
            });
    }
    setTime(): void {
        this.validityTime = 120;
        let timer = setInterval(() => {
            this.validityTime--;
            if (this.validityTime <= 0) {
                clearInterval(timer);
                this.secondPart = false;
                this.generateCaptcha();
            }
        }, 1000);
    }
}
