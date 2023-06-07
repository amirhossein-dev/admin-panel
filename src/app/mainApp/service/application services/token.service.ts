import { Injectable } from '@angular/core';
import { IToken } from '../../interfaces/token.interface';
import { IApplicationToken } from 'src/app/mainApp/interfaces/applicationToken.interface';

const ACCESS_TOKEN_KEY: string = 'access_token';
const REFRESH_TOKEN_KEY: string = 'refresh_token';
const ACCESS_EXPIRE_TIME_KEY: string = 'access_expire_time';
const REFRESH_EXPIRE_TIME_KEY: string = 'refresh_expire_time';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    getAccessToken(): string | null {
        let token = sessionStorage.getItem(ACCESS_TOKEN_KEY);
        if (!token) token = localStorage.getItem(ACCESS_TOKEN_KEY);
        return token;
    }

    getRefreshToken(): string | null {
        let token = sessionStorage.getItem(REFRESH_TOKEN_KEY);
        if (!token) token = localStorage.getItem(REFRESH_TOKEN_KEY);
        return token;
    }

    getAccessExpireTime(): Date | null {
        let time = sessionStorage.getItem(ACCESS_EXPIRE_TIME_KEY);
        if (!time) time = localStorage.getItem(ACCESS_EXPIRE_TIME_KEY);
        return time ? new Date(time) : null;
    }

    saveTokens(token: IToken): void {
        localStorage.setItem(ACCESS_TOKEN_KEY, token.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, token.refreshToken);
        localStorage.setItem(
            ACCESS_EXPIRE_TIME_KEY,
            token.expireTime.toString()
        );
        sessionStorage.setItem(ACCESS_TOKEN_KEY, token.accessToken);
        sessionStorage.setItem(REFRESH_TOKEN_KEY, token.refreshToken);
        sessionStorage.setItem(
            ACCESS_EXPIRE_TIME_KEY,
            token.expireTime.toString()
        );
    }
    saveTokensNew(token: IToken): void {
        sessionStorage.setItem(ACCESS_TOKEN_KEY, token.accessToken);
        sessionStorage.setItem(REFRESH_TOKEN_KEY, token.refreshToken);
        sessionStorage.setItem(
            ACCESS_EXPIRE_TIME_KEY,
            token.expireTime.toString()
        );
    }

    clearTokens(): void {
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
        sessionStorage.removeItem(REFRESH_TOKEN_KEY);
        sessionStorage.removeItem(ACCESS_EXPIRE_TIME_KEY);
        sessionStorage.removeItem(REFRESH_EXPIRE_TIME_KEY);
    }

    isPermanent(): boolean {
        let token = localStorage.getItem(ACCESS_TOKEN_KEY);
        if (token) return true;
        return false;
    }
}
