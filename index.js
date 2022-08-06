// TODO: Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// TODO: Create an array of questions for user input
const questions = [
  "What is the title of your project?",
  "Could you describe your project?",
  "How does one install your project?",
  "How does one use your project?",
  "Are there any credits you would like to add for your project?",
  "What license are you using?",
];
const licenses = [
  new inquirer.Separator(),
  "No license",
  new inquirer.Separator(),
  "Apache 2.0 License",
  "Boost Software License 1.0",
  "BSD 3-Clause License",
  "CC0",
  "Eclipse Public License 1.0",
  "GNU GPL v3",
];

// TODO: Create a function to write README file
function writeToFile(data) {
  fs.writeFile("README.md", generateMarkdown(data), (err) =>
    err ? console.error(err) : console.log("Success!")
  );
}

// TODO: Create a function to initialize app
function init() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: questions[0],
      },
      {
        name: "description",
        type: "input",
        message: questions[1],
      },
      {
        name: "installation",
        type: "input",
        message: questions[2],
      },
      {
        name: "usage",
        type: "input",
        message: questions[3],
      },
      {
        name: "credits",
        type: "input",
        message: questions[4],
      },
      {
        name: "license",
        type: "list",
        message: questions[5],
        choices: licenses,
        default: licenses[1],
      },
    ])
    .then((answers) => {
      writeToFile(answers);
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment");
      } else {
        console.log("Something else went wrong");
      }
    });
}

// Function call to initialize app
init();
