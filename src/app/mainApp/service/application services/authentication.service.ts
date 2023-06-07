import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    BehaviorSubject,
    concatMap,
    finalize,
    mapTo,
    Observable,
    ReplaySubject,
    retry,
    tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiResult } from 'src/app/mainApp/interfaces/api-result.interface';
import { TokenService } from './token.service';
import { IToken } from '../../interfaces/token.interface';
import { ILoginCredential } from '../../interfaces/loginCredential.interface';
import { IPersonInformation } from '../../interfaces/personalInfo.interface';
import { IUserInfo } from '../../interfaces/userInfo.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    clientId: string = 'fMhXcgdUwD5UCgTwWvitFp9IuR4a';
    clientSecret: string = 'y3wVxj8ux4qRfQm3mFLO61b_1BAa';
    baseUrl: string = `${environment.wso2Address}`;
    baseUrlSecurity: string = `${environment.wso2Address}/Security`;

    loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    roles = new BehaviorSubject<string[]>([]);
    username!: string;
    displayName!: string;
    department!: string;
    department$ = new BehaviorSubject<string | null>('');

    constructor(
        private router: Router,
        private http: HttpClient,
        private tokenService: TokenService
    ) {
        this.init();
    }

    private init(): void {
        this.username = sessionStorage.getItem('username')!;
        this.displayName = sessionStorage.getItem('displayName')!;
        this.department = sessionStorage.getItem('department')!;
        this.department$.next(this.department);
        let roles: string[] = [];
        if (sessionStorage.getItem('roles')) {
            roles = sessionStorage.getItem('roles')!.split(',');
        }
        this.roles.next(roles);
        let refreshToken = this.tokenService.getRefreshToken();
        if (refreshToken) {
            this.loggedIn.next(true);
        }
    }

    private getPersonInfo(): Observable<IApiResult<IPersonInformation>> {
        return this.http.get<IApiResult<IPersonInformation>>(
            `${this.baseUrlSecurity}/IDS/Users/getPersonInfo`
        );
    }

    logout(tokenError?: boolean): void {
        this.roles.next([]);
        this.username = '';
        this.department = '';
        this.department$.next(this.department);
        this.displayName = '';
        this.loggedIn.next(false);
        this.revokeToken();

        let whitelableLogOut = sessionStorage.getItem('LogoutUrl');

        if (whitelableLogOut != null || whitelableLogOut != undefined) {
            window.location.href = whitelableLogOut;
        } else {
            this.router.navigateByUrl('auth/login');
        }

        sessionStorage.clear();
    }

    private revokeToken(): void {
        let accessToken = this.tokenService.getAccessToken();

        let body = {
            accessToken: accessToken,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
        };

        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.http
            .post<IApiResult<boolean>>(
                `${this.baseUrlSecurity}/IDS/Token/revoke`,
                body,
                { headers }
            )
            .subscribe();

        this.tokenService.clearTokens();
    }

    hasTokenExpired(): boolean | null | string {
        return (
            this.tokenService.getAccessToken() &&
            this.tokenService.getAccessExpireTime()! < new Date()
        );
    }

    tokenRenewalState = new ReplaySubject<boolean>(1);

    renewToken() {
        let refreshToken = this.tokenService.getRefreshToken();

        let requestData = {
            previousRefreshToken: refreshToken,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
        };

        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.http
            .post<IApiResult<IToken>>(
                `${this.baseUrlSecurity}/IDS/Token/refresh`,
                requestData,
                { headers }
            )
            .pipe(
                tap((token) => {
                    console.log('new token arrived');

                    let now = new Date();
                    now.setSeconds(now.getSeconds() + token.result.expireIn);
                    token.result.expireTime = now;
                    this.tokenService.clearTokens();
                    this.tokenService.saveTokensNew(token.result);
                }),
                mapTo(true),
                retry(1),
                finalize(() => {
                    // after renewing we need to reset our replay subject for next renewal
                    this.tokenRenewalState.complete();
                    this.tokenRenewalState = new ReplaySubject<boolean>(1);
                })
            )
            .subscribe(
                (v) => {
                    this.tokenRenewalState.next(v);
                },
                (err) => {
                    //in case of error we didn't renew the token, so logout
                    this.tokenRenewalState.next(false);
                    console.log(err);

                    this.logout(true);
                }
            );
    }

    login(
        model: ILoginCredential,
        captchaHashCode: string
    ): Observable<boolean> {
        let body = {
            captchaHashCode: captchaHashCode,
            captchaValue: model.captchaValue,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            scope: `device_${window.crypto.getRandomValues(new Uint32Array(1))[0]
                }`,
            username: model.username,
            password: model.password,
        };

        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http
            .post<IApiResult<IToken>>(
                `${this.baseUrlSecurity}/IDS/Token`,
                body,
                { headers }
            )
            .pipe(
                tap((token) => {
                    let now = new Date();
                    now.setSeconds(now.getSeconds() + token.result.expireIn);
                    token.result.expireTime = now;
                    now.setSeconds(now.getSeconds());

                    this.tokenService.clearTokens();
                    this.tokenService.saveTokensNew(token.result);
                    this.loggedIn.next(true);
                }),
                concatMap(() =>
                    this.getPersonInfo().pipe(
                        tap((info) => {
                            if (!info.result.roles) {
                                throw 'Access denied';
                            }
                            this.username = '';
                            if (info.result.username)
                                this.username = info.result.username;
                            sessionStorage.setItem('username', this.username);

                            let roles: any[] = [];
                            if (info.result.roles) {
                                roles = info.result.roles.map((v) =>
                                    v.toLocaleLowerCase()
                                );
                            }
                            sessionStorage.setItem('roles', roles.join(','));
                            this.roles.next(roles);

                            let name = `${info.result.personInfo.firstName
                                ? info.result.personInfo.firstName
                                : ''
                                } ${info.result.personInfo.lastName
                                    ? info.result.personInfo.lastName
                                    : ''
                                }`.trim();
                            this.displayName = name ? name : this.username;

                            this.department = info.result.department;
                            this.department$.next(this.department);

                            sessionStorage.setItem(
                                'displayName',
                                this.displayName
                            );
                            sessionStorage.setItem(
                                'department',
                                this.department
                            );
                        })
                    )
                ),
                mapTo(true)
            );
    }

    generateCaptcha(): Observable<IApiResult<any>> {
        let randomNumber = Math.floor(Math.random() * 9999998) + 90000001;
        return this.http.get<IApiResult<any>>(
            `${this.baseUrlSecurity}/Captcha?${randomNumber}`
        );
    }

    verifyCaptcha(
        captchaHashCode: string,
        captchaValue: string
    ): Observable<IApiResult<any>> {
        return this.http.get<IApiResult<any>>(
            `${this.baseUrl}/Captcha/verify`,
            {
                params: {
                    captchaHashCode: captchaHashCode,
                    captchaValue: captchaValue,
                },
            }
        );
    }

    getUserInfoByNationalCode(nationalCode: number): Observable<IApiResult<IUserInfo[]>> {
        return this.http.get<IApiResult<IUserInfo[]>>(`${this.baseUrlSecurity}/IDS/Users/getByNationalCode?nationalCode=${nationalCode}`)
    }
    getUserByUsername(userId: string): Observable<IApiResult<IUserInfo[]>> {
        return this.http.get<IApiResult<IUserInfo[]>>(`${this.baseUrlSecurity}/IDS/Users/search?userName=${userId}`)
    }
    getUserByLastName(userLastName: string) {
        return this.http.get(`${this.baseUrlSecurity}/IDS/Users/searchByLastName?lastName=${userLastName}`)
    }

}
