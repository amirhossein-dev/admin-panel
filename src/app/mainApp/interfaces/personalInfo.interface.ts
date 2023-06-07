export interface IPersonInformation {
    department: string;
    nationalCode: string;
    personAttributes: string;
    username: string;
    roles: string[];
    personInfo: IPersonalDetails;

}

export interface IPersonalDetails {
    id: number;
    bimeCode: string;
    birthDate: string;
    dead: boolean;
    fatherName: string;
    firstName: string;
    genderTypeId: number
    lastActionTime: number;
    lastActionType: string;
    lastActorUserId: string;
    lastName: String;
    mobile: string;
    nationalCode: string;
    postalAddress: string;
    postalCode: string;
    registerationNumber: string;
    registerationPlaceId: string;
    registerationSeri: string;
    strBirthDate: string;

}
