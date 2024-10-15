# Employee Inquirer

## Description

Using Inquirer version 8.2.4, users can navigate an employee database. They have the options do a number of tasks, including viewing and adding employees, departments, or roles within their organization. Each of the above are tables within the database itself.
The repository for this code can be found [here](https://github.com/cbaumgart004/employeeInquirer)

## Table of Contents

- [Employee Inquirer](#employee-inquirer)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  - [License](#license)

## Installation

- npm i inquirer@8.2.4 pg dotenv
- This will ensure that you have the correct version of inquirer and all the Postgres dependencies, as well as the dotenv module.
- Be sure Postgres is running, and log in to Postgres from the /db folder (psql -U postgres).
- Enter your password
- Once logged in as postgres, \i schema.sql, then \i seeds.sql to create, connect, then seed the database.
- Return to the root of the project and run node index.js

## Usage

Within this application, Users can perform the following actions:

- View All Departments
- View All Roles
- View All Employees
- Add a Department
- Add a Role and assign it to a department
- Add an Employee and assign them a role and a manager (optional)
- Update Employee Role
- Exit, which will exit the program
  ![Use Case](assets/EmployeeInquirerUse.jpg)
- A Walkthrough video can be seen [here](https://github.com/cbaumgart004/employeeInquirer/blob/main/Assets/EmployeeInquirerWalkthrough.mp4). Click the "View Raw" link to download the video.

## Credits

This application was was developed by [Chris Baumgart](https://github.com/cbaumgart004).  
I struggled initially with Postgres and figuring out how to get tables joined. The documentation on the Postgres website was helpful. Specifically, this tutorial found [here](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-inner-join/). This was very helpful for getting my inquirer prompts to return multiple tables, with all the joins. Additonally, I found a helpful YouTube tutorial on Inquirer [here](https://www.youtube.com/watch?v=gZugKSoAyoY).

## License

This application uses an MIT License that can be found [here](https://github.com/cbaumgart004/employeeInquirer/blob/main/LICENSE)
