//Global variables
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const Employee = require("./library/Employee");
const Engineer = require("./library/Engineer");
const Intern = require("./library/Intern");
const Manager = require("./library/Manager");

//Promts for building the team

//Array for the manager prompt
const firstQuestion = [
  {
    type: "input",
    name: "name",
    message: "What is the manager's name?"
  },
  {
    type: "input",
    name: "id",
    message: "What the manager's id?"
  },
  {
    type: "input",
    name: "email",
    message: "What is the manager's email?"
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is the manager's office number?"
  },
  {
    type: "list",
    name: "member",
    message: "Which team memebr would you like to add next?",
    choices: ["Intern", "Engineer"]
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
    name: "id",
    message: "What is the employee's id?"
  },
  {
    type: "input",
    name: "email",
    message: "What is the employee's email?"
  },
  {
    type: "input",
    name: "github",
    message: "What is the employee's GitHub username?"
  }
];

const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the employees's name?"
  },
  {
    type: "input",
    name: "id",
    message: "What is the employeess id?"
  },
  {
    type: "input",
    name: "email",
    message: "What is the employees's email?"
  },
  {
    type: "input",
    name: "school",
    message: "What school does the employee attend?"
  }
];

const addMoreTeamMembers = [
  {
    type: "list",
    name: "moreMembers",
    message: "Do you want to add another member to the team?",
    choices: ["Engineer", "Intern", "No, my team is ready."]
  }
];

inquirer
  .prompt(firstQuestion)
  .then(function(userChoices) {
    const mainTemplate = fs.readFileSync(`./templates/main.html`, {
      encoding: "utf8"
    });

    //Render the manager card
    const manager = new Manager(
      userChoices.name,
      userChoices.id,
      userChoices.email,
      userChoices.officeNumber
    );

    let developerTeam = renderHTML(manager);
    renderTeam(userChoices.member, developerTeam, mainTemplate);
  })
  .catch(err => console.log(err));

function renderHTML(role) {
  const templateFile = fs.readFileSync(
    `./templates/${role.getRole().toLowerCase()}.html`,
    { encoding: "utf8" }
  );
  let temporaryFile = templateFile.replace("{{ name }}", role.name);
  temporaryFile = temporaryFile.replace("{{ role }}", role.getRole());
  temporaryFile = temporaryFile.replace("{{ id }}", role.id);
  temporaryFile = temporaryFile.replace("{{ email }}", role.email);
  temporaryFile = temporaryFile.replace("{{ email }}", role.email);

  if (role.getRole().toLowerCase() === "engineer") {
    temporaryFile = temporaryFile.replace("{{ github }}", role.github);
    temporaryFile = temporaryFile.replace("{{ github }}", role.github);
  } else if (role.getRole().toLowerCase() === "intern") {
    temporaryFile = temporaryFile.replace("{{ school }}", role.school);
  } else if (role.getRole().toLowerCase() === "manager") {
    temporaryFile = temporaryFile.replace(
      "{{ officeNumber }}",
      role.officeNumber
    );
  }

  return temporaryFile;
}

async function renderTeam(memberChosen, developerTeam, mainTemplate) {
  console.log("render team function");
  try{
    do{
      switch(memberChosen){
        case "engineer":
          const engineer = await inquirer.prompt(engineerQuestions);
          console.log(engineer);

          let newEngineer = new Engineer(engineer.name, engineer.id, engineer.email, engineer.github);
          let engineerCard = renderHTML(newEngineer);
          developerTeam = developerTeam + engineerCard
          console.log(developerTeam);
          let nextPrompt = await inquirer.prompt(addMoreTeamMembers);
          console.log(nextPrompt);

          if(nextPrompt.userChoices[0]===false){
            let tempMain = mainTemplate.replace('{{ team }}', developerTeam);
            fs.writeFileSync("index.html"tempMain)
          } else if (nextPrompt.userChoices[0]==="true"){
            const newTeamMember = await inquirer.prompt(addMoreTeamMembers)
            memberChosen = newTeamMember.addMoreTeamMembers[0];
          }

          break;
          case "intern":
          const intern = await inquirer.prompt(internQuestions)
      }



    }
  }while
} catch(err){
  console.log(err)
}
