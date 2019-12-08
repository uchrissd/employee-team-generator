//Global variables

const inquirer = require("inquirer");
const fs = require("fs");
const employee = require("./library/Employee");
const engineer = require("./library/Engineer");
const intern = require("./library/Intern");
const manager = require("./library/Manager");

const util = require("util");
const answersArray = [];
const cardObject = {};
const cardHTMLArray = [];

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

//Call the initialize prompt function
initialPrompt();

//Function that initializes the prompt
function initialPrompt() {
  inquirer.prompt(initialQuestions).then(answers => {
    pushToTeamArray(answers, "manager");
    if (answers.member[0] === "done") {
      readHTMLCards();
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

//Function that prompts for engineer information
function engineerPrompt() {
  inquirer.prompt(engineerQuestions).then(answers => {
    pushToTeamArray(answers, "engineer");
    if (answers.member[0] === "done") {
      readHTMLCards();
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
//Function that prompts for intern information
function internPrompt() {
  inquirer.prompt(internQuestions).then(answers => {
    pushToTeamArray(answers, "intern");
    if (answers.member[0] === "done") {
      readHTMLCards();
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
//Function that pushes anwers and the employee roll to the team array
function pushToTeamArray(answers, role) {
  let cardInfo = Object.assign({}, answers);
  cardInfo["member"] = role;
  answersArray.push(cardInfo);
  console.log(answersArray);
}

//Function for reading the HTML employee cards
function readHTMLCards() {
  let htmlFiles = [
    { file: "../Develop/templates/engineer.html", role: "engineer" },
    { file: "../Develop/templates/intern.html", role: "intern" },
    { file: "../Develop/templates/manager.html", role: "manager" }
  ];
  htmlFiles.forEach(element => {
    fs.readFile(element.file, "utf8", function(error, data) {
      if (error) {
        return console.log(error);
      }
      cardObject[element.role] = data;
      console.log(cardObject);
      employeeLoop(cardObject);
    });
  });
}
//Function that loops through the answers array and
function employeeLoop(cardObject) {
  console.log(Object.keys(cardObject).length);
  if (Object.keys(cardObject).length === 3) {
    let cardString = "";
    answersArray.forEach(person => {
      switch (person.member) {
        case "engineer":
          cardString = cardObject.engineer;
          // console.log("this is the card string", cardString);

          break;
        case "intern":
          cardString = cardObject.intern;
          break;
        case "manager":
          cardString = cardObject.manager;
          break;
        default:
          console.log("this member is not an option");
      }

      updateString(person, cardString);
    });
  } else {
    console.log("still gathering html cards");
  }
}

function updateString(person, cardString) {
  if (cardString.includes("{{ name }}")) {
    cardString = cardString.replace("{{ name }}", person.name);
    console.log(cardString);
  }

  if (cardString.includes("{{ role }}")) {
    cardString = cardString.replace("{{ role }}", person.role);
  }

  if (cardString.includes("{{ id }}")) {
    cardString = cardString.replace("{{ id }}", person.id);
  }

  if (cardString.includes("{{ email }}")) {
    cardString = cardString.replace("{{ email }}", person.email);
  }

  if (cardString.includes("{{ github }}")) {
    cardString = cardString.replace("{{ github }}", person.github);
  }

  if (cardString.includes("{{ school }}")) {
    cardString = cardString.replace("{{ school }}", person.school);
  }

  if (cardString.includes("{{ officeNumber }}")) {
    cardString = cardString.replace("{{ officeNumber }}", person.officeNumber);
  }

  cardHTMLArray.push(cardString);

  renderHTML(cardHTMLArray);
}

function renderHTML(cardHTMLArray) {
  fs.writeFile("./output/cards.txt", cardHTMLArray.join(), err => {
    // throws an error, you could also catch it here
    if (err) console.log(err);
    // success case, the file was saved
    console.log("file saved");
  });
}

// renderMain = html => {
//   const template = fs.readFileSync(
//     path.resolve(templatesDir, "main.html"),
//     "utf8"
//   );
//   return replacePlaceholders(template, "team", html);
// };
