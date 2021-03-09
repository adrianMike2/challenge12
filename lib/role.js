const inquirer = require('inquirer');
const mysql = require('mysql2')
const promptUser = require('../server')

const connection = mysql.createConnection({
    host: 'loclhost',
    user: 'root',
    password: 'ghost149',
    database: 'employeetracker'
});

const viewRoles = () => {
    connection.query(
        `SELECT * FROM role`,
        function (err, results) {
            console,table(results);
            promptUser()
        }
    );
};

const confirmRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'roleTitle',
            message: 'please provide the title  of your role.',
            validate: nameInput => {
                if (nameInput){
                    return true
                } else {
                    console.log('Please provide the title of your role(Required).')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'Enter this positions salary.',
            validate: nameInput => {
                if (nameInput){
                    return true
                } else {
                    console.log('Enter this positions salary(Required).')
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'departmentId',
            message: 'What is the department id of this employee?.',
            validate: nameInput => {
                if (nameInput){
                    return true
                } else {
                    return false;
                }
            }
        }
    ]).then(answers => {
        const sql =
        'INSERT INTO role SET title = ?, salary = ?, department_id = ?';
        const param = [answers.roleTitle, answers.salary, answer,departmentId];
        const query = connection.query(sql, params,
        
        function (err,res) {
            if (err) throw err;
            console.log(res.affectedRows + 'role inserted!\n');
        }
        );
        promptUser();
    })
}
module.exports = {viewRoles, confirmRole}