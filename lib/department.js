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

module.exports = { viewDepartments }
