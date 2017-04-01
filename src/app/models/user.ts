export class User {
    username:string;
    password:string;
    firstName:string;
    lastName:string;
    roles:String[];
    constructor(username:string,password:string,fname:string,lname:string,roles:String[]){
        this.username=username;
        this.password=password;
        this.firstName=fname;
        this.lastName=lname;
        this.roles=roles;
    }
}
