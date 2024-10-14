//reuire pool module
const pool = require('../db')

//add inquirer for prompt choices
const inquirer = require('inquirer')
async function viewEmployees() {
  try {
    const result = await pool.query(
      `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
                  (SELECT CONCAT(e2.first_name, ' ', e2.last_name) FROM employee e2 WHERE e2.id = employee.manager_id) AS manager
                  FROM employee
                  INNER JOIN role ON employee.role_id = role.id
                  INNER JOIN department ON role.department_id = department.id`
    )
    //return as table format
    console.log('Employees:')
    console.table(result.rows)
  } catch (error) {
    console.error('Error retrieving employees:', error)
  }
}
//add employees
// Add a new employee to the database
async function addEmployee(first_name, last_name, role_id, manager_id) {
  try {
    // Insert employee into the database
    await pool.query(
      'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', // Using $1, $2, $3, $4 for PostgreSQL
      [first_name, last_name, role_id, manager_id]
    )
    console.log(`Added ${first_name} ${last_name} to the database.`)
  } catch (error) {
    console.error('Error adding employee:', error)
  }
}

//export function to be used in other files
module.exports = { viewEmployees, addEmployee }
