import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "jalali-moment";

@Pipe({
    name: "persianDate"
})
export class PersianDateConvertor implements PipeTransform {
    transform(value: string | Date): string {
        const result = moment(value, 'YYYY-MM-DD HH:mm:ss');
        return result.locale('fa').format('YYYY/MM/DD')
    }
}
