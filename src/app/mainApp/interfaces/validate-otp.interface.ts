export interface IValidateOtp {
    captchaHashCode: string,
    captchaValue: number,
    username: string,
    phoneNumber?: string
}
