//Global variables

const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

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

initialPrompt();

// const writeFileAsync = util.promisify(fs.writeFile);
// console.log(writeFileAsync);

function initialPrompt() {
  inquirer.prompt(initialQuestions).then(answers => {
    console.log(answers["member"]);
    // engineerPrompt();
  });
}

function engineerPrompt() {
  inquirer.prompt(engineerQuestions).then(answers => {
    console.log(answers);
    internPrompt();
  });
}
function internPrompt() {
  inquirer.prompt(internQuestions).then(answers => {
    console.log(answers);
  });
}

// function endPromt(answers) {
//   if (answers)

// };
