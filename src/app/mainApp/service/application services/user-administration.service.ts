import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiResult } from '../../interfaces/api-result.interface';
import { IChangeUserGroupName } from '../../interfaces/changeUserGroupObject.interface';
import { ICreateUsersGroup } from '../../interfaces/create-group.interface';
import { IRemoveMemberFromGroup } from '../../interfaces/remove-member-from-group.interface';

@Injectable({
    providedIn: 'root'
})
export class UserAdministrationService {
    baseUrl: string = `${environment.wso2Address}/Security`;

    constructor(private http: HttpClient) { }


    getAllUserGroups(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/IDS/Groups/search`)
    }

    changeGroupName(requestObject: IChangeUserGroupName): Observable<any> {
        return this.http.patch<any>(`${this.baseUrl}/IDS/Groups`, requestObject)
    }

    removeUserFromGroup(requestObject: IRemoveMemberFromGroup): Observable<any> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: requestObject
        };
        return this.http.delete<Observable<any>>(`${this.baseUrl}/IDS/Groups/removeMember`, options)
    }

    createGroup(requestObject: ICreateUsersGroup): Observable<any> {
        return this.http.post(`${this.baseUrl}/IDS/Groups`, requestObject)
    }
    deleteUsersGroup(requestObject: string): Observable<IApiResult<boolean>> {
        return this.http.delete<IApiResult<boolean>>(`${this.baseUrl}/IDS/Groups?groupId=${requestObject}`)
    }

    getUsersOfGroup(requestObject: string): Observable<IApiResult<any>> {
        return this.http.get<IApiResult<any>>(`${this.baseUrl}/IDS/Groups/searchGroupUserInfo?groupName=${requestObject}`)
    }
}
