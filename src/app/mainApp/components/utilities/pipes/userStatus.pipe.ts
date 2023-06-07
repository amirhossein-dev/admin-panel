import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'userStatus' })
export class UserStatusPipe implements PipeTransform {
    transform(value: boolean): string {
        return value ? "فعال" : "معلق"
    }
}
