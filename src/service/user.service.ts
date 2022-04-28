export default class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;

    constructor(id:string, firstName:string, lastName:string, email:any, password:any, phone:string) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.password = password;
            this.phone = phone;
    }
}

