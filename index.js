const app = require("./src/app.js")
const fs = require('fs');
const inquirer = require('inquirer');


const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

const team = [];

const managerData = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "Enter the Manager's Name",
            validate: managerNameInput => {
                if (managerNameInput) {
                    return true;
                } else {
                    console.log("Please Enter a valid name")
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "managerId",
            message: "Enter the Manager's ID Number",
            validate: managerIdInput => {
                if (managerIdInput) {
                    return true;
                } else {
                    console.log("You must enter a ID!")
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "managerEmail",
            message: "Enter the Manager's Email Address",
            validate: managerEmailInput => {
                if (managerEmailInput) {
                    return true;
                } else {
                    console.log("Enter a valid Email Address")
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "managerOffice",
            message: "What is the Managers office number?",
            validate: managerOfficeInput => {
                if (managerOfficeInput) {
                    return true;
                } else {
                    console.log("What is the room number?")
                    return false;
                }
            }
        }
    ])
        .then(userInput => {
            const { managerName, managerId, managerEmail, managerOffice } = userInput;
            const manager = new Manager(managerName, managerId, managerEmail, managerOffice);

            team.push(manager);
        })
};

const employeeData = () => {

    return inquirer.prompt
        ([
            {
                type: "input",
                name: "employeeName",
                message: "What is your employee's name?",
                validate: employeeNameInput => {
                    if (employeeNameInput) {
                        return true;
                    } else {
                        console.log("Enter a Name please!");
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "employeeId",
                message: "What is the employee's ID?",
                validate: employeeIdInput => {
                    if (employeeIdInput) {
                        return true;
                    } else {
                        console.log("What is the employee ID?")
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "employeeEmail",
                message: "What is the Employee's email?",
                validate: employeeEmailInput => {
                    if (employeeEmailInput) {
                        return true;
                    } else {
                        console.log("Enter a valid email please")
                        return false;
                    }
                }
            },
            {
                type: "list",
                name: "employeeType",
                message: "What type of employee would you like to add?",
                choices: ['Engineer', 'Intern'],
                validate: employeeTypeInput => {
                    if (employeeTypeInput) {
                        return true;
                    } else {
                        console.log("You have to select one")
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "github",
                message: "What is the employee's github username?",
                when: (input) => input.employeeType === "Engineer",
                validate: githubInput => {
                    if (githubInput) {
                        return true;
                    } else {
                        console.log("What is their username?")
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "school",
                message: "What school does your intern go to?",
                when: (input) => input.employeeType === "Intern",
                validate: schoolInput => {
                    if (schoolInput) {
                        return true;
                    } else {
                        console.log("What is their school?")
                        return false;
                    }
                }
            },
            {
                type: "confirm",
                name: "additionalEmployee",
                message: "Would you like to add another employee?",
                default: false

            },
        ])
        .then(userInput => {
            let { employeeName, employeeId, employeeEmail, employeeType, github, school, additionalEmployee } = userInput;
            let employee;

            if (role === "Engineer") {
                employee = new Engineer(employeeName, employeeId, employeeEmail, github);

                console.log(employee);

            } else if (role === "Intern") {
                employee = new Intern(employeeName, employeeId, employeeEmail, school);

                console.log(employee);
            }

            team.push(employee);

            if (additionalEmployee) {
                return employeeData(team);
            } else {
                return team;
            }
        })
};

function writeFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            throw err
        };
        console.log('File Created!')
    });
};

managerData()
    .then(employeeData)
    .then(team => {
        return app(team)
    })
    .then(teamProfile => {
        return writeFile(teamProfile);
    })
    .catch(err => {
        console.log(err);
    });