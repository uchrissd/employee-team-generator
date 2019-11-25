const Employee = require("../library/Employee");
​
class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name,id,email, school);
        
    }
​
    getSchool() {
        return this.school;
    }
​
    getRole() {
        return "Intern";
    }
}
​
module.exports = Intern;