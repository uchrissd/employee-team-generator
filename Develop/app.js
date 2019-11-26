//Global variables

const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const answersArray = [];
const cardObject = {};

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
    pushToTeamArray(answers, "manager");
    if (answers.member[0] === "done") {
      return;
    } else {
      if (answers.member[0] === "engineer") {
        engineerPrompt();
      } else {
        internPrompt();
      }
    }
  });
}

function engineerPrompt() {
  inquirer.prompt(engineerQuestions).then(answers => {
    pushToTeamArray(answers, "engineer");
    if (answers.member[0] === "done") {
      return;
    } else {
      if (answers.member[0] === "engineer") {
        engineerPrompt();
      } else {
        internPrompt();
      }
    }
  });
}
function internPrompt() {
  inquirer.prompt(internQuestions).then(answers => {
    pushToTeamArray(answers, "intern");
    if (answers.member[0] === "done") {
      return;
    } else {
      if (answers.member[0] === "engineer") {
        engineerPrompt();
      } else {
        internPrompt();
      }
    }
  });
}

function pushToTeamArray(answers, role) {
  let cardInfo = Object.assign({}, answers);
  cardInfo["member"] = role;
  answersArray.push(cardInfo);
  console.log(answersArray);
}

function readHTMLCards() {
  fs.readFile("../Develop/templates/engineer.html", "utf8", function(
    error,
    data
  ) {
    if (error) {
      return console.log(error);
    }
    cardObject["engineer"] = data;

    console.log(cardObject);
  });

  fs.readFile("../Develop/templates/intern.html", "utf8", function(
    error,
    data
  ) {
    if (error) {
      return console.log(error);
    }
    cardObject["intern"] = data;

    console.log(cardObject);
  });

  fs.readFile("../Develop/templates/manager.html", "utf8", function(
    error,
    data
  ) {
    if (error) {
      return console.log(error);
    }
    cardObject["manager"] = data;

    console.log(cardObject);
  });
  // console.log(cardObject);
}

readHTMLCards();

// Create one object with all of the HTML cards
// Make a function that loops through the answers array and depending on what knd of member they are, creatre a card and replace the
//curly bracket info with the actual cards
//Then append that information to a card array. Then render that info to the main html page

// const templateFile = fs
//     .readFileSync(
//         '../templates/engineer.html',
//         { encoding: 'utf8' }
//     );
// ​
// let temporaryFile = templateFile.replace('{{ name }}', 'Bob');
// ​
// temporaryFile = temporaryFile.replace('{{ email }}', 'Bob@subgenius.org')

// function fileSync() {
