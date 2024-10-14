-- Insert departments
INSERT INTO department (name) VALUES ('Engineering'), ('Sales'), ('HR'), ('Development');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES ('Engineer', 70000, 1), ('Salesperson', 50000, 2), ('HR Manager', 60000, 3);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL), ('Jane', 'Smith', 2, 1), ('Mike', 'Johnson', 3, NULL);
