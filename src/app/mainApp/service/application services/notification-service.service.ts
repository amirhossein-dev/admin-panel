import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(private messageService: MessageService) { }

    showSucces(inputObject: string) {
        this.messageService.add({ key: 'onSucces', life: 4000, severity: "success", summary: inputObject })
        // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }
    showInfo(inputObject: string) {
        this.messageService.add({ key: 'onInfo', life: 4000, severity: "info", summary: inputObject })
    }
    showWarn(inputObject: string) {
        this.messageService.add({ key: 'onWarn', life: 4000, severity: "warn", summary: inputObject })
    }
    showError(inputObject: string) {
        this.messageService.add({ key: 'onError', life: 4000, severity: "error", summary: inputObject })
    }

}
