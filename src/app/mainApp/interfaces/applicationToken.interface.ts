export interface IApplicationToken {
    access_token: string;
    refresh_token: string;
    scope: string
    token_type: string;
    expires_in: number;
    expireTime: Date;
}
