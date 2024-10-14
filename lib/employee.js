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
async function addEmployee() {
  try {
    //pull roles and allow to choose a role
    const roles = await pool.query('SELECT * FROM role')
    const roleChoices = roles.rows.map(({ id, title }) => ({
      name: title,
      value: id,
    }))
    //pull employees and allow to choose a manager
    const employees = await pool.query('SELECT * FROM employee')
    const managerChoices = employees.rows.map(
      ({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      })
    )
    // Allow for no manager
    managerChoices.push({ name: 'None', value: null })

    const { first_name, last_name, role_id, manager_id } =
      await inquirer.prompt([
        { name: 'first_name', message: 'Enter the employee’s first name:' },
        { name: 'last_name', message: 'Enter the employee’s last name:' },
        {
          type: 'list',
          name: 'role_id',
          message: 'Select the employee’s role:',
          choices: roleChoices,
        },
        {
          type: 'list',
          name: 'manager_id',
          message: 'Select the employee’s manager:',
          choices: managerChoices,
        },
      ])

    // Insert employee into the database
    await pool.query(
      'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
      [first_name, last_name, role_id, manager_id]
    )
    console.log(`Added ${first_name} ${last_name} to the database.`)
  } catch (error) {
    console.error('Error adding employee:', error)
  }
}

//export function to be used in other files
module.exports = { viewEmployees, addEmployee }
