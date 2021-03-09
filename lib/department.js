const mysql = require('mysql2');
const inquirer = require('inquirer');
const promptUser = require('../server');


const connection = mysql.createConnection({
    host: 'loclhost',
    user: 'root',
    password: 'ghost149',
    database: 'employeetracker'
});

const exit = () => {
    connection.end();
}

const viewDepartments = () => {connection.query(
    `SELECT * FROM department`,
    function(err, results){
        console.table(results)
        promptUser();
    }
);
};
const confirmDepartment = () => {
    return inquirer.prompt(
        {
            type: 'input',
            name:'departmentName',
            message: 'Please provide the name of your department. (Required)',
            validate: nameinput => {
                if (nameinput) {
                    return true 
                }else{
                    console.log('Please provide the name of your department.')
                    return false;
                }
            }
        },
    ).then(answers => {
        const query = connection.query(
            `INSERT INTO department (name)
            VALUES (?)`,
            [answers.viewDepartmentName],
            
            function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + `department inserted!\n`);
            }
        );
        promptUser
    })
}

function viewByDepartment() {
    connection.query(
        `SELECT CONCAT(employee.first_name, '', employee.last_name) AS name, department.name AS department
        FROM employee 
        JOIN role 
        ON role.id = employee.role_id
        INNER JOIN department
        ON role.department_id = department.id`,
        function (err, res) {
            if (err) throw err;
            console.table(res);
            promtUser();
        }
    );
}

module,exports = {viewDepartments, confirmDepartment, exit, viewByDepartment};
