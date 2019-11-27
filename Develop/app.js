//Global variables

const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const answersArray = [];
const cardObject = {};
const cardHTMLArray = [];

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

function pushToTeamArray(answers, role) {
  let cardInfo = Object.assign({}, answers);
  cardInfo["member"] = role;
  answersArray.push(cardInfo);
  console.log(answersArray);
}

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

function employeeLoop(cardObject) {
  console.log(Object.keys(cardObject).length);
  if (Object.keys(cardObject).length === 3) {
    let cardString = "";
    answersArray.forEach(person => {
      switch (person.member) {
        case "engineer":
          cardString = cardObject.engineer;
          console.log(cardString);

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
    cardString.replace("{{ name }}", person.name);
  }

  if (cardString.includes("{{ role }}")) {
    cardString.replace("{{ role }}", person.role);
  }

  if (cardString.includes("{{ id }}")) {
    cardString.replace("{{ id }}", person.id);
  }

  if (cardString.includes("{{ email }}")) {
    cardString.replace("{{ email }}", person.email);
  }

  if (cardString.includes("{{ github }}")) {
    cardString.replace("{{ github }}", person.github);
  }

  if (cardString.includes("{{ school }}")) {
    cardString.replace("{{ school }}", person.school);
  }

  if (cardString.includes("{{ officeNumber }}")) {
    cardString.replace("{{ officeNumber }}", person.officeNumber);
  }

  cardHTMLArray.push(cardString);
  console.log("this is the card html array", cardHTMLArray);
}
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
