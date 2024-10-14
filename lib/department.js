const db = require('../db')
//view departments.  No joins, just pull the table directly
async function viewDepartments() {
  try {
    const result = await db.query('SELECT * FROM department')
    console.table(result.rows)
  } catch (error) {
    console.error('Error retrieving departments:', error)
  }
}

//add a department
async function addDepartment(name) {
  try {
    await db.query('INSERT INTO department (name) VALUES ($1)', [name])
    console.log(`Added department ${name} to the database.`)
  } catch (error) {
    console.error('Error adding department:', error)
  }
}
module.exports = { viewDepartments, addDepartment }
