const pool = require('../db')

//view roles
async function viewRoles() {
  try {
    const result = await pool.query(
      //Join to department table to get department name
      `SELECT role.id, role.title, department.name AS department, role.salary 
              FROM role 
              INNER JOIN department ON role.department_id = department.id`
    )
    console.table(result.rows)
  } catch (error) {
    console.error('Error retrieving roles:', error)
  }
}
async function addRole(title, salary, department_id) {
  try {
    const result = await pool.query(
      'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING id',
      [title, salary, department_id]
    )
    console.log(`Role added with ID: ${result.rows[0].id}`)
  } catch (error) {
    console.error('Error adding role:', error)
  }
}

module.exports = { viewRoles, addRole }
