"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, firstName, lastName, email, password, phone) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }
}
exports.default = User;
