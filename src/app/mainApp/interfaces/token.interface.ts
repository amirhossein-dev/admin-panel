export interface IToken {
    accessToken: string;
    refreshToken: string;
    scope: string
    tokenType: string;
    expireIn: number;
    expireTime: Date;
}
