export interface IUser{
    name:string,
    email:string,
    password:string,
    role:USER_ROLE,
    createdAt:Date,
    updatedAt:Date,
}

export enum USER_ROLE {
    ADMIN = 'ADMIN',
    USER = 'USER'
}