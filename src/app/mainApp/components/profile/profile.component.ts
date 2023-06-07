import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IChangePassword } from '../../interfaces/change-password.interface';
import { AuthenticationService } from '../../service/application services/authentication.service';
import { UserManagerService } from '../../service/application services/user-manager.service';

@Component({
    selector: 'profile-app',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [MessageService],
})
export class ProfileComponent implements OnInit {
    header: string = 'تغییر رمز عبور ';
    hashImageSrc: string = '';
    hashCode: string = '';
    isLoading: boolean = false;

    @ViewChild('changePassword') firstInput!: ElementRef;

    changePasswordFormGroup = new FormGroup({
        newPassword: new FormControl('', Validators.required),
        captchaValue: new FormControl('', Validators.required),
    });
    constructor(
        private authenticationService: AuthenticationService,
        private userManagerService: UserManagerService,
        private notificationService: MessageService
    ) {}

    ngOnInit(): void {
        this.generateCaptcha();
        this.setFocusFucntion();
    }

    setFocusFucntion(): void {
        setTimeout(() => {
            this.firstInput.nativeElement.focus();
        }, 0);
    }

    generateCaptcha() {
        this.authenticationService.generateCaptcha().subscribe((resData) => {
            this.hashCode = resData.result.hashCode;
            this.hashImageSrc = resData.result.imageSrc;
        });
    }

    onSubmitChangePassword() {
        this.isLoading = true;
        let obj: IChangePassword = {
            captchaHashCode: this.hashCode,
            newPassword:
                this.changePasswordFormGroup.controls.newPassword.value!,
            captchaValue:
                this.changePasswordFormGroup.controls.captchaValue.value!,
        };

        this.userManagerService.changePassword(obj).subscribe(
            (resData) => {
                if (resData.result != null) {
                    this.isLoading = false;
                    this.notificationService.add({
                        key: 'changePasswordInfo',
                        severity: 'success',
                        summary: 'گذرواژه با موفقیت تغییر یافت',
                    });
                }
            },
            (error) => {
                this.notificationService.add({
                    key: 'changePasswordInfo',
                    severity: 'error',
                    summary: error.error.businessErrors[0].message,
                });
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
}
