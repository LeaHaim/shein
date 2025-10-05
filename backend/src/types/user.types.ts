interface IUser{
    _id?:string,
    name:string,
    email:string,
    password:string,
    role:USER_ROLE,
    createdAt:Date,
    updatedAt:Date,
}

enum USER_ROLE {
    ADMIN,USER
}