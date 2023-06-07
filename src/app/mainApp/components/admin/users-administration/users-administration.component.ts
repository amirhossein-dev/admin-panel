import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IChangeUserGroupName } from 'src/app/mainApp/interfaces/changeUserGroupObject.interface';
import { IUserGroups } from 'src/app/mainApp/interfaces/user-gorups.interface';
import { ConfirmationService } from 'primeng/api';
import { UserAdministrationService } from 'src/app/mainApp/service/application services/user-administration.service';
import { ICreateUsersGroup } from 'src/app/mainApp/interfaces/create-group.interface';
import { NotificationService } from 'src/app/mainApp/service/application services/notification-service.service';



@Component({
    selector: 'UsersAdministration',
    templateUrl: './users-Administration.component.html',
    styleUrls: ['./users-Administration.component.scss'],
    providers: [ConfirmationService]
})
export class UsersAdministrationComponent implements OnInit {
    cardHeader: string = 'گروه های کاربران'
    allUserGroups!: IUserGroups[]
    selectedGroup: any;
    usersOfSelectedGroup!: any[]
    selectedGroupObject!: string[]

    @ViewChild('createGroupInput') createGroupInput!: ElementRef

    displayPosition: boolean = false;
    visible: boolean = true;
    toggleChangeNameSection: boolean = false;
    changeGroupNameLoading: boolean = false;
    personInfoSectionToggle: boolean = false;
    createNewGroupToggle: boolean = false
    dataToggle: boolean = true;
    createGroupLoading: boolean = false;
    hasMember: boolean = false


    changeUserGroupName = new FormGroup({
        groupName: new FormControl('', Validators.required)
    })

    createNewUserGroupFormGroup = new FormGroup({
        id: new FormControl(0, Validators.required),
        groupName: new FormControl('', Validators.required)
    })

    selectedGroupName: string = ""
    constructor(private userAdminService: UserAdministrationService,
        private confirmationService: ConfirmationService, private notificationService: NotificationService) { }

    ngOnInit(): void {
        this.getAllUserGroups()
    }


    toggleCreateNewGroupSection() {
        this.createNewGroupToggle = !this.createNewGroupToggle
        this.setFocus()
    }

    setFocus() {
        this.createGroupInput
        setTimeout(() => {
            this.createGroupInput.nativeElement.focus()
        }, 0);
    }

    getAllUserGroups() {
        this.userAdminService.getAllUserGroups().subscribe(resData => {
            this.allUserGroups = resData.result
            for (let i = 0; i < resData.result.length; i++) {

                if (resData.result[i].members) {
                    resData.result[i].groupMembersCount = resData.result[i].members.length;

                }
                else {
                    resData.result[i].groupMembersCount = 0;
                }


            }

            this.dataToggle = false;
        })
    }

    dismissModal() {
        this.createNewGroupToggle = false;
        this.createNewUserGroupFormGroup.reset()
    }

    selectedRowFunction(selectedRow: any) {
        this.selectedGroup = selectedRow;
        console.log(selectedRow.groupName)
        this.userAdminService.getUsersOfGroup(selectedRow.groupName).subscribe(resData => {
            if (resData.result.length > 0) {
                this.hasMember = true;
            }
            this.selectedGroupName = selectedRow.groupName;
            this.usersOfSelectedGroup = resData.result;
            this.displayPosition = true
        }, err => {
            this.hasMember = false;
        })
    }


    changeSelectedGroupName() {
        this.toggleChangeNameSection = !this.toggleChangeNameSection;
    }

    onSubmitChangeUserGroupName() {
        this.changeGroupNameLoading = true;

        let requestObject: IChangeUserGroupName = {
            id: this.selectedGroup.id,
            groupName: this.changeUserGroupName.controls.groupName.value!
        }

        this.userAdminService.changeGroupName(requestObject).subscribe(resData => {
            this.toggleChangeNameSection = !this.toggleChangeNameSection
            this.selectedGroupName = this.changeUserGroupName.controls.groupName.value!

            this.changeGroupNameLoading = false;
            this.changeUserGroupName.reset();
            this.getAllUserGroups()
        }, err => {
            console.log(err)
            this.changeUserGroupName.reset();
            this.changeGroupNameLoading = false;
        })
    }


    removeUserFromGroup() {

    }
    confirm(event: Event, selectedUser: any) {
        this.confirmationService.confirm({
            target: event.target!,
            icon: 'pi pi-exclamation-triangle',
            message: 'آیا از حذف این کاربر اطمینان دارید ؟',
            accept: () => {
                var removeMemberFromGroup: any = {
                    "groupId": this.selectedGroup.id,
                    "userId": selectedUser.id
                }
                this.userAdminService.removeUserFromGroup(removeMemberFromGroup).subscribe(resData => {

                    this.selectedRowFunction(resData.result)
                })
            },
            reject: () => {
            }
        });
    }

    createNewUserGroup() {
        this.userAdminService.createGroup(this.createNewUserGroupFormGroup.value as ICreateUsersGroup).subscribe(resData => {
            this.createGroupLoading = true

            this.notificationService.showSucces(`گروه جدید با نام ${this.createNewUserGroupFormGroup.controls.groupName.value}  با موفقیت ثبت شد`)

            this.createGroupLoading = false;
            this.createNewUserGroupFormGroup.reset()
            this.createNewGroupToggle = false;
            this.getAllUserGroups();
        }, err => {
            this.createGroupLoading = false;
            this.createNewUserGroupFormGroup.reset()
            this.createNewGroupToggle = false;
        })
    }


    deleteSelectedGroup(event: Event, selectedGroup: any) {
        this.confirmationService.confirm({
            target: event!.target!,
            icon: 'pi pi-exclamation-triangle',
            message: 'آیا از حذف این گروه اطمینان دارید ؟',
            accept: () => {
                this.userAdminService.deleteUsersGroup(selectedGroup.id).subscribe(resData => {
                    if (resData.result == true) {
                        this.notificationService.showSucces(`حذف ${selectedGroup.groupName} موفقیت آمیز بود`)
                        this.dataToggle = true;
                        this.getAllUserGroups();
                        this.dataToggle = false;
                    }

                })
            },
            reject: () => {
            }
        });

    }




}
