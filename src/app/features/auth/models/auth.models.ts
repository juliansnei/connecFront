export interface AuthResponseModel{
    status: string,
    message:string,
    data: AuthData
}

export interface AuthData {
    token:string,
    user:UserModel
}

export interface UserModel {
    id:number,
    name:string,
    email:string,
   
}

export interface AuhtRequest {
    email:string,
    password:string
}