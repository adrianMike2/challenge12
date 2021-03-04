const inquirer = require('inquirer');
const mysql = require('mysql2');
const promptUser = require('../server')

const connection = mysql.createConnection({
    host: 'loclhost',
    user: 'root',
    password: 'UT}G5?C5!OzWRw7dvw{&#Y8~?2',
    database: 'employeetracker'
});

const viewEmployees = () => {connection.query(
    'SELECT * FROM employee',
    function(err, results) {
        console.table(results);
        promptUser();
    }
);
};

const confirmEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'employeeFirstName',
            message: 'please provide first name of this employee.',
            validate: nameInput => {
                if (nameInput){
                    return true
                } else {
                    console.log('Please provide the first name of this employee(Required).')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'employeelastName',
            message: 'please provide last name of this employee.',
            validate: nameInput => {
                if (nameInput){
                    return true
                } else {
                    console.log('Please provide the last name of this employee(Required).')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'employeeRole',
            message: 'Enter the role of this employee.',
            validate: nameInput => {
                if (nameInput){
                    return true
                } else {
                    console.log('Please provide the role  of this employee(Required).')
                    return false;
                }
            }
        }, 
        {
            type: 'input',
            name: 'employeeManager',
            message: 'Enter the Manager for this employee.',
            validate: nameInput => {
                if (nameInput){
                    return true
                } else {
                    console.log('Enter the Manager for this employee(Required).')
                    return false;
                }
            }
        }, 
    ]).then(answers => {
        const query = connection.query(
           `INSERT INTO employee (first_name, last_name, role_id, manager_id)
           VALUES (?, ?, ?, ?)`,

           
           [answers.employeeFirstName, answers.employeeFirstName, answers.employeeRole, answers.employeeManager],
           
           function(err, res) {
               if (err) throw err;
               console.log(res.affectedRows + 'role inserted!\n');
           }
        );
        promptUser();
    })
}

module.exports = {viewEmployees, confirmEmployee}