
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- Connect to the newly created database
\c employee_db;

--create tables
--department, then role, then employee

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INTEGER NOT NULL, 
    --ties back to department via department_id
    CONSTRAINT fk_department FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    --ties back to role via role_id
    CONSTRAINT fk_role FOREIGN KEY(role_id) REFERENCES role(id)
);