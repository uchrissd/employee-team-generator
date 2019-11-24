const Employee = require("../Employee");
   
class Engineer extends Employee {
    constructor(name, id, email, githubUsername) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.githubUsername = githubUsername;
    }
​
    getGithubUsername() {
        return githubUsername;
    }
    
    getRole() {
        return "Engineer";
    }
}
​
​
​
module.exports = Engineer;