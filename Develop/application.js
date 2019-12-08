//Global variables
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const employee = require("./library/Employee");
const engineer = require("./library/Engineer");
const intern = require("./library/Intern");
const manager = require("./library/Manager");

//Promts for building the team

//Array for the manager prompt
const initialQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the manager's name?"
  },
  {
    type: "input",
    message: "What the manager's employee id?",
    name: "id"
  },
  {
    type: "input",
    message: "What is the manger's email?",
    name: "email"
  },
  {
    type: "input",
    message: "What is the manger's office number?",
    name: "officeNumber"
  },
  {
    type: "checkbox",
    message: "What type of team member would you like to add?",
    name: "member",
    choices: ["engineer", "intern", "done"]
  }
];
//Array for the engineer prompt
const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the employee's name?"
  },
  {
    type: "input",
    message: "What is the employee id?",
    name: "id"
  },
  {
    type: "input",
    message: "What is the employee's email?",
    name: "email"
  },
  {
    type: "input",
    message: "What is the employee's github username?",
    name: "github"
  },

  {
    type: "checkbox",
    message: "What type of team member would you like to add?",
    name: "member",
    choices: ["engineer", "intern", "done"]
  }
];

//Array for the intern
const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the employee's name?"
  },
  {
    type: "input",
    message: "What is the employee id?",
    name: "id"
  },
  {
    type: "input",
    message: "What is the employee's email?",
    name: "email"
  },
  {
    type: "input",
    message: "What school is the employee going to?",
    name: "school"
  },

  {
    type: "checkbox",
    message: "What type of team member would you like to add?",
    name: "member",
    choices: ["engineer", "intern", "done"]
  }
];

inquirer.prompt(initialQuestions).then(function(userChoices) {
  const mainTemplate = fs.readFileSync(`./templates/main.html`, {
    encoding: "utf8"
  });
});
