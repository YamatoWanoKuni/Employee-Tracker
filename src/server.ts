import express from 'express';
import inquirer from 'inquirer';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';

function greeting() {
  console.log(` Welcome to Employee Tracker!
What would you like to do today?`)
};

function addDepartments() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: 'Enter the name for the new department: '
    }
  ]) .then((answers) => 
  
  pool.query('INSERT INTO departments (name) VALUES ($1)', [answers.department],(err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.log(`Department ${answers.department} added!`);
      tasks();
    }
  })
)
};

function viewDepartments() {
  pool.query('SELECT departments.id AS "ID", departments.name AS "Department" FROM departments', (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.table(result.rows);
    }
  })
};

function dEmployee(answers: any) {
  const { id } = answers;
  return id;
};

async function addRoles() {
  try {
    let answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'role',
        message: 'Enter the name for the new role: '
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the new role: '
      },
      {
        type: 'input',
        name: 'department',
        message: 'Enter the department the new role belongs to: '
      }
    ])
    const fetchDepId = await pool.query('SELECT departments.id FROM departments WHERE departments.name = $1', [answers.department]);
    const parseId = dEmployee(fetchDepId.rows[0]);
    const result = await pool.query('INSERT INTO roles (title, salary, department) VALUES ($1, $2, $3)', [answers.role, answers.salary, parseId]);
        if (result) {
        console.log(`Role ${answers.role} added!`);
        tasks();
      }
    } catch (err) {
  console.error(err);
}
};

function viewRoles() {
  pool.query('SELECT roles.title AS "Job Title", roles.id AS "Role ID", departments.name AS "Department", roles.salary AS "Salary" FROM roles JOIN departments ON roles.department = departments.id', (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.table(result.rows);
              
            }
          })
};  

async function addEmployees() {
  try {
    let answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the first name of the employee: '
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the last name of the employee: '
      },
      {
        type: 'input',
        name: 'manager',
        message: 'Enter the last name of the manager for the new employee: '
      },
      {
        type: 'input',
        name: 'role',
        message: 'Enter the job title of the employee: '
      }
    ]);
    const manager_id = await pool.query('SELECT employees.id FROM employees WHERE employees.last_name = $1', [answers.manager]);
    const parsedManID = dEmployee(manager_id.rows[0]);
    const role_id = await pool.query('SELECT roles.id FROM roles WHERE roles.title = $1', [answers.role]);
    const parsedRoleID = dEmployee(role_id.rows[0]);
    const result = await pool.query('INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES ($1, $2, $3, $4)', [answers.first_name,answers.last_name,parsedManID,parsedRoleID])
        if (result) {
        console.log(`Employee ${answers.first_name} ${answers.last_name} added!`);
        tasks();
      }
    }
    catch (err) {
    console.error(err);
  }
};

function viewEmployees() {
  pool.query(`SELECT employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Job Title", roles.salary AS "Salary", departments.name AS "Department", manager.first_name || ' ' || manager.last_name AS "Manager"  FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department = departments.id LEFT JOIN employees manager ON employees.manager_id = manager.id`, (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.table(result.rows);
              
            }
          })
};

function tasks() {
  let exit: boolean = false;
  inquirer.prompt([
    {
        type: 'list',
        name: 'action',
        message: 'Select an action:',
        choices: [
          'View All Departments',
          'Add a Department',
          'Add a Role',
          'View All Roles',
          'View All Employees',
          'Add an Employee',
          'Exit',
        ],
    },
  ]) .then((answers) =>{
      if (answers.action === 'Add a Department') {
        addDepartments()
        return;
      }
      else if (answers.action === 'View All Departments') {
        viewDepartments();
      }
      else if (answers.action === 'Add a Role') {
        addRoles()
        return;}
      else if (answers.action === 'View All Roles') {
        viewRoles()
      }
      else if (answers.action === 'Add a Employee') {
        addEmployees();
        return;
      }
      else if (answers.action === 'View All Employees') {
        viewEmployees() }
      else {
        exit = true;
        process.exit(0);

      }
      if (!exit){
          tasks();
      }
      
  })
}