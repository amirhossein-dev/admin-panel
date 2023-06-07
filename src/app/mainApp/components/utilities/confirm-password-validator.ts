import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";


export class ConfirmPasswordValidator {
    static MatchValidator(source: string, target: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const sourceCtrl = control.get(source)
            const targetCtrl = control.get(target)
            return sourceCtrl?.value !== targetCtrl?.value ? { missMatch: true } : null;
        }
    }
}
