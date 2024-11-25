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
      Tasks();
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
    const parseId = destructureEmployee(fetchDepId.rows[0]);
    const result = await pool.query('INSERT INTO roles (title, salary, department) VALUES ($1, $2, $3)', [answers.role, answers.salary, parseId]);
        if (result) {
        console.log(`Role ${answers.role} added!`);
        Tasks();
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
        return;
      }
      else if (answers.action === 'View All Roles') {
        viewRoles()
      }
      else {
        exit = true;
        process.exit(0);

      }
      if (!exit){
          tasks();
      }
      
  })
}