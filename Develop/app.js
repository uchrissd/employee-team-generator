const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
console.log(writeFileAsync);

function promptUser() {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "What is your user name?",
        name: "username"
      },
      {
        type: "languages",
        message: "What languages do you know?",
        name: "password"
      },
      {
        type: "communication",
        message: "What is your prefered method od communication?",
        name: "confirm"
      }
    ])
    .then(function(response) {
      if (response.confirm === response.password) {
        console.log("Success!");
      } else {
        console.log("You forgot your password already?!");
      }
    });
}

promptUser();
