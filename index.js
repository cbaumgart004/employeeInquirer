const inquirer = require('inquirer')
const pool = require('./db') // Import the pool for database queries
//define functions for each inquirer prompt below
//View employees
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

//function to start inquirer and handle user choices
const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Choose an action:',
      choices: [
        'View employees',
        'Add employee',
        'Update employee',
        'Delete employee',
        'Exit',
      ],
    },
  ])
  //Switch case for each user choice
  switch (action) {
    case 'View employees':
      await viewEmployees()
      break

    case 'Exit':
      console.log('Goodbye!')
      process.exit()
      break
  }
  //Show the main menu again after each action
  await mainMenu()
}

mainMenu()
