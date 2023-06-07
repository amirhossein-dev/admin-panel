import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/mainApp/service/application services/notification-service.service';
interface IGroup {
    code: string,
    name: string
}


@Component({
    selector: 'task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
    constructor(private notificationService: NotificationService) { }
    tasks: any[] = [
        {
            date: "1401/01/02",
            taskTitle: "برآرورد میزان خسارت",
            isPersonAssigned: "برزویی",
            isGroupAssigned: ""
        },
        {
            date: "1401/01/02",
            taskTitle: "برآرورد میزان خسارت",
            isPersonAssigned: "",
            isGroupAssigned: "گروه خسارت"
        },
        {
            date: "1401/01/02",
            taskTitle: "برآرورد میزان خسارت",
            isPersonAssigned: "",
            isGroupAssigned: "گروه خسارت"
        },
        {
            date: "1401/01/02",
            taskTitle: "برآرورد میزان خسارت",
            isPersonAssigned: "",
            isGroupAssigned: "گروه خسارت"
        },
        {
            date: "1401/01/02",
            taskTitle: "برآرورد میزان خسارت",
            isPersonAssigned: "برزویی",
            isGroupAssigned: ""
        },
        {
            date: "1401/01/02",
            taskTitle: "تائید قابل پرداخت بودن خسارت",
            isPersonAssigned: "برزویی",
            isGroupAssigned: ""
        },
        {
            date: "1401/01/02",
            taskTitle: "رسیدگی به اعتراض رد ادعا",
            isPersonAssigned: "برزویی",
            isGroupAssigned: ""
        },
        {
            date: "1401/01/02",
            taskTitle: "رسیدگی به اعتراض  میزان خسارت",
            isPersonAssigned: "صفارنیا",
            isGroupAssigned: "گروه خسارت"
        },
        {
            date: "1401/01/02",
            taskTitle: "برآرورد میزان خسارت",
            isPersonAssigned: "صفارنیا",
            isGroupAssigned: "گروه خسارت"
        },
        {
            date: "1401/01/02",
            taskTitle: "تعیین میزان اضافه نرخ توسط پزشک",
            isPersonAssigned: "صفارنیا",
            isGroupAssigned: "گروه خسارت"
        },
        {
            date: "1401/01/02",
            taskTitle: "خریدن لاستیک عقب خاور",
            isPersonAssigned: "",
            isGroupAssigned: "گروه سایبری"
        },
        {
            date: "1401/01/02",
            taskTitle: "خریدن لاستیک عقب خاور",
            isPersonAssigned: "",
            isGroupAssigned: "گروه معماری"
        },
        {
            date: "1401/01/02",
            taskTitle: "خریدن لاستیک عقب خاور",
            isPersonAssigned: "جوادپور",
            isGroupAssigned: ""
        },
        {
            date: "1401/01/02",
            taskTitle: "خریدن لاستیک عقب خاور",
            isPersonAssigned: "",
            isGroupAssigned: "گروه سایبری"
        },
    ]
    formGroup!: FormGroup;

    visible: boolean = true
    toggleModal: boolean = false
    groups!: any[]
    // "گروه مالی",
    // "گروه خسارت",
    // "گروه حسابداری",
    // "گروه صنعت",
    // "گروه معدن",


    selectedGroup: any;

    ngOnInit(): void {
        this.groups = [
            { name: 'گروه مالی', code: 'NY' },
            { name: 'گروه خسارت', code: 'RM' },
            { name: 'گروه حسابداری', code: 'LDN' },
            { name: 'گروه صنعت', code: 'IST' },
            { name: 'گروه معدن', code: 'PRS' }
        ];

        this.formGroup = new FormGroup({
            selectedGroup: new FormControl<IGroup | null>(null)
        });
    }




    dismissModal() {
        this.toggleModal = false;
        this.formGroup.reset()
    }

    showMessage() {
        this.notificationService.showSucces(`تسک مورد نطر با موفقیت ارجاع داده شد`)
        this.toggleModal = false
    }

}
