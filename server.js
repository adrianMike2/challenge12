const inquirer = require('inquirer')

function promptUser() {

    inquirer
    .prompt({
        type:"list",
        name:"promptOptions",
        message: "What would you like to do?",
        choices:['view all departments', 'view all roles', 'view all employees', 'add a department','add a role',
    'add an employee', 'view employee by department', 'exit']
    })
    .then(userAnswers => {
        switch (userAnswers.promptOptions) {
            case "view all deparments":
        viewDepartments();
        break;

        case "view all roles":
        break;

        case "view all employees":
        viewEmployees()
        break;
        case "Add a department":
        confirmDepartment()
        break;

        case "Add a role":
        confirmRole()
        break;

        case "Add an employee":
        confirmEmployee()
        break;

        case "view employee by Department":
        viewByDepartment()
        break;

        case "exit":
        process.exit()
        break;
        }
    })
};

module.exports = promptUser;

const {viewDepartments, confirmDepartment, exit, viewByDepartment} = require('./lib/department.js');
const {viewRoles, confirmRole} = require('./lib/role.js')
const {viewEmployees, confirmEmployee} =require('./lib/employee.js')

promptUser();