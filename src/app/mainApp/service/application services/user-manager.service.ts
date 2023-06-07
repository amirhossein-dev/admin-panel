import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiResult } from 'src/app/mainApp/interfaces/api-result.interface';
import { IChangePassword } from 'src/app/mainApp/interfaces/change-password.interface';
import { IResetPassword } from '../../interfaces/resetPassword.interface';
import { IValidateOtp } from 'src/app/mainApp/interfaces/validate-otp.interface';

@Injectable({
    providedIn: 'root',
})
export class UserManagerService {
    private baseUrl: string = `${environment.wso2Address}/Security`;

    constructor(private http: HttpClient) {}

    changePassword(
        changePsswordObject: IChangePassword
    ): Observable<IApiResult<any>> {
        return this.http.patch<IApiResult<boolean>>(
            `${this.baseUrl}/IDS/Users/updatePassword`,
            changePsswordObject
        );
    }

    resetPassword(
        resetPasswordObject: IResetPassword
    ): Observable<IApiResult<boolean>> {
        return this.http.post<IApiResult<boolean>>(
            `${this.baseUrl}/IDS/Users/validateOTP`,
            resetPasswordObject
        );
    }

    getOtp(validateOtp: IValidateOtp) {
        return this.http.post<IApiResult<any>>(
            `${this.baseUrl}/IDS/Users/forgotPassword`,
            validateOtp
        );
    }
}
