# employee-team-generator

This is a command line program that generates an HTML page containing information about different members of a developer team. The user first enters the information for the team manager. Then, they have the option to add engineers and interns to the team. The user can add as many interns or engineers as they want before terminating the process. Information includes: name, employee id, office number, email. github account, and the school they are attending.

**Motivation**
The motivation for the project is practice using node.js, the npm inquirer packages, JavaScript constructors, classes, async functionality and TDD testing practices.

**Build status**

The build status is complete.

**Code style**

The application is written in JavaScript and runs in node.js. Users need to download the npm inquirer package in order to run the application locally in the command line.

**Screenshots**

![ Screenshot](/Assets/images/app-screen-shot.jpg)

**Code Example**

```javascript
//Async function for rendering the team. Expected output is new team members in the forms of HTML
//divs that will later be rendered onto the index HTML document which is produced once the user
//chooses to stop adding new team members to the team.
async function renderTeam(memberChosen, developerTeam, mainTemplate) {
  try {
    console.log("render team function");

    switch (memberChosen) {
      case "Engineer":
        const engineer = await inquirer.prompt(engineerQuestions);
        console.log(engineer);

        let newEngineer = new Engineer(
          engineer.name,
          engineer.id,
          engineer.email,
          engineer.github
        );

        console.log(newEngineer);
        let engineerCard = renderHTML(newEngineer);
        developerTeam = developerTeam + engineerCard;
        console.log(developerTeam);
        let nextPrompt = await inquirer.prompt(addMoreTeamMembers);
        console.log("this is the next prompt", nextPrompt);
        if (nextPrompt.moreMembers === "No, my team is ready.") {
          let tempMain = mainTemplate.replace("{{ team }}", developerTeam);
          fs.writeFileSync("index.html", tempMain);
        } else {
          memberChosen = nextPrompt.moreMembers;
          renderTeam(memberChosen, developerTeam, mainTemplate);
        }
        break;
      case "Intern":
        console.log("intern was selected");

        const intern = await inquirer.prompt(internQuestions);
        console.log("this is the intern", intern);
        let newIntern = new Intern(
          intern.name,
          intern.id,
          intern.email,
          intern.school
        );

        let internCard = renderHTML(newIntern);
        developerTeam = developerTeam + internCard;
        console.log(developerTeam);
        let newNextMove = await inquirer.prompt(addMoreTeamMembers);
        if (newNextMove.moreMembers === "No, my team is ready.") {
          let tempMain = mainTemplate.replace("{{ team }}", developerTeam);
          fs.writeFileSync("index.html", tempMain);
        } else {
          memberChosen = newNextMove.moreMembers;
          renderTeam(memberChosen, developerTeam, mainTemplate);
        }
        break;

      default:
        console.log(memberChosen, developerTeam, mainTemplate);
    }
  } catch (err) {
    console.log(err);
  }
}
```

**Installation**

No installation necessary. Project is hosted here: https://github.com/uchrissd/employee-team-generator
