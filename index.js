const fs = require('fs');

const inquirer = require('inquirer');


//importing constructor
const Employee = require('./lib/Employee')
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');


//importing template
const generateTemplate = require('./templates/template');
const generateHtml = require('./generateHtml');

const teamMembers = [];

function userInfo() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Employee Name',
            name: 'name',
            validate: function (nameInput) {
                if (nameInput) {
                    return true;
                } else {
                    return 'Please Enter Employee Name';
                }
            }
        },


        {
            type: 'input',
            message: 'Enter Email',
            name: 'email',
            validate: function (emailInput) {
                if (emailInput) {
                    return true;
                } else {
                    return 'Please enter Email address';
                }
            }

        },

        {
            type: 'input',
            message: 'Enter Employee Id',
            name: 'id',
            validate: function (idInput) {
                if (idInput) {
                    return true;

                } else {
                    return 'Please enter Employee Id';
                }
            }

        },

        {
            type: 'list',
            message: 'Select Role: ',
            name: 'role',
            choices: ["Manager", "Engineer", "Intern"]
        },
    ])
        .then(answers => {


            if (answers.role === 'Manager') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'office',
                        message: 'Enter Office Number:',
                        validate: officeInput => {
                            if (officeInput) {
                                return true;
                            } else {
                                return 'Please enter office No';
                            }
                        }
                    }
                ])
                    .then(response => {
                        console.log(response.office);
                        const teamManager = new Manager(answers.name, answers.email, answers.id, answers.role, response.office)
                        teamMembers.push(teamManager);
                        addOption()

                    })
            } else if (answers.role === 'Engineer') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'gitHub',
                        message: 'Enter Github name:',
                        validate: githubInput => {
                            if (githubInput) {
                                return true;
                            } else {
                                return 'Please enter gitHub username.';
                            }
                        }
                    }

                ])
                .then(response => {
                    console.log(response.gitHub);
                    const teamEngineer = new Engineer (answers.name, answers.email, answers.id, answers.role, response.gitHub)
                    teamMembers.push(teamEngineer);
                    addOption()
                })
            } else if (answers.role === 'Intern') {
                inquirer.prompt([
                    {
                    type: 'input',
                    name: 'school',
                    message: 'Enter School Name: ',
                    validate: function (schoolInput) {
                        if(schoolInput) {
                            return true;
                        } else {
                            return 'Please enter school name';
                        }
                    }
                }
            ])
            .then(response => {
                console.log(response.school);
                const teamIntern = new Intern (answers.name,  answers.email, answers.id, answers.role, response.school)
                teamMembers.push(teamIntern);
                addOption()

            })
            } else {
                const teamEmployee = new Employee (answers.name, answers.email, answers.id, answers.role);
                teamMembers.push(teamEmployee);
                addOption()
            }

            //add options

            function addOption() {
                inquirer.prompt([
                    {
                        type: 'confirm',
                        name: 'addMore',
                        message: 'Would you like to add another employee?'
                    }
                ])
                .then(response => {
                    if(response.addMore === true) {
                        userInfo(teamMembers);

                    } else {
                        console.log('team', teamMembers)
                        let htmlCardLayout = generateTemplate(teamMembers);
                        generateHtml(htmlCardLayout)
                    }
                })
            }

        })
    }

    userInfo();
