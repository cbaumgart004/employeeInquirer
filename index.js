const inquirer = require('inquirer')
const pool = require('./db') // Import the pool for database queries
//import functions for each inquirer prompt from helper functions below
const { viewEmployees, addEmployee } = require('./lib/employee')

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

    case 'Add employee':
      await addEmployee()
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
