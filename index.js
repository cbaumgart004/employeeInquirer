const inquirer = require('inquirer')
const pool = require('./db') // Import the pool for database queries
//import functions for each inquirer prompt from helper functions below
const { viewEmployees, addEmployee } = require('./lib/employee')
const { viewRoles, addRole } = require('./lib/role')
const { viewDepartments, addDepartment } = require('./lib/department')

//function to start inquirer and handle user choices
const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Choose an action:',
      choices: [
        'View employees',
        'View roles',
        'View departments',
        'Add employee',
        'Add role',
        'Add department',
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

    case 'View roles':
      await viewRoles()
      break

    case 'View departments':
      await viewDepartments()
      break

    case 'Add employee':
      await addEmployee()
      break

    case 'Add role':
      // departments for role creation
      const departments = await pool.query('SELECT * FROM department')
      const departmentChoices = departments.rows.map(({ id, name }) => ({
        name,
        value: id,
      }))

      const { title, salary, department_id } = await inquirer.prompt([
        { name: 'title', message: 'Enter the role title:' },
        { name: 'salary', message: 'Enter the salary for the role:' },
        {
          type: 'list',
          name: 'department_id',
          message: 'Choose a department for this role:',
          choices: departmentChoices,
        },
      ])
      await addRole(title, salary, department_id)
      break

    case 'Add department':
      const { name } = await inquirer.prompt([
        { name: 'name', message: 'Enter the name of the new department:' },
      ])
      await addDepartment(name)
      break

    case 'Exit':
      console.log('Goodbye!')
      process.exit()
  }
  //Show the main menu again after each action
  await mainMenu()
}

mainMenu()
