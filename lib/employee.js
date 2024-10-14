//reuire pool module
const pool = require('../db')

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

module.exports = { viewEmployees }
