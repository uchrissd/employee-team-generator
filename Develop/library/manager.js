const Employee = require("../library/Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name,id,email,officeNumber);
        
    }
​
    getOfficeNumber() {
        return this.officeNumber;
    }
​
    getRole() {
        return "Manager";
    }
}
​
module.exports = Manager;