export class  User{
    
    Name: string;
    LastName: string;
    DateOfBirth: Date;
    Address: string;
    Active: Boolean;
    ImageUrl: string;
    Type: string;
    Password: string;
    ConfirmPassword: string;
    Email: string;
    Status:string;
    PhoneNumber:string;

    constructor(username:string,password:string){
        this.Email=username;
        this.Password=password;
    }
}