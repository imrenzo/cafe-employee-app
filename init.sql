
CREATE SEQUENCE employee_seq START 0 MINVALUE 0 INCREMENT 1;
CREATE TABLE IF NOT EXISTS employees (
    seq_id BIGINT DEFAULT nextval('employee_seq'),
    id CHAR(9) GENERATED ALWAYS AS ('UI' || LPAD(seq_id::text, 7, '0')) STORED PRIMARY KEY,
    name CHAR(100) NOT NULL,
	/*https://www.regular-expressions.info/email.html*/
    email_address VARCHAR(255) NOT NULL UNIQUE CHECK (email_address ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'), 
    phone_number CHAR(8) NOT NULL CHECK (phone_number ~ '^[89][0-9]{7}$'),
    gender VARCHAR(6) NOT NULL CHECK (gender IN ('male', 'female')) -- No uppercase for consistency
);

CREATE TABLE IF NOT EXISTS cafes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    logo TEXT, -- image url/path
    location VARCHAR(255) NOT NULL CHECK (location !~ '[A-Z]') -- No uppercase for consistency
);

CREATE TABLE IF NOT EXISTS employee_cafe (
    employee_id CHAR(9) PRIMARY KEY REFERENCES employees(id) ON DELETE CASCADE,
    cafe_id UUID NOT NULL REFERENCES cafes(id) ON DELETE CASCADE,
    start_date DATE NOT NULL
);

-- 1. Employees
INSERT INTO employees (name, email_address, phone_number, gender) VALUES
('John', 'john@gmail.com', '98765432', 'male'),
('Jane', 'jane@gmail.com', '91234567', 'female'),
('Alice', 'alice@gmail.com', '92345678', 'female'),
('Bob', 'bob@gmail.com', '93456789', 'male');

-- 2. Cafes
INSERT INTO cafes (id, name, description, location) VALUES
('023e89d6-7e01-40f1-a7fa-db9820f841e0', 'ABC', 'New cafe in Orchard', 'orchard'),
('123e89d6-7e01-40f1-a7fa-db9820f841e1', 'Cafe XYZ', 'Cozy cafe in Marina', 'marina'),
('223e89d6-7e01-40f1-a7fa-db9820f841e2', 'Java Beans', 'Popular hangout in Clementi', 'clementi');


--- need auto get ids
-- 3. Employee_Cafe relationships
INSERT INTO employee_cafe (employee_id, cafe_id, start_date) VALUES
('UI0000000', '023e89d6-7e01-40f1-a7fa-db9820f841e0', '2025-11-06'),
('UI0000001', '023e89d6-7e01-40f1-a7fa-db9820f841e0', '2025-11-07'),
('UI0000002', '123e89d6-7e01-40f1-a7fa-db9820f841e1', '2025-11-05'),
('UI0000003', '223e89d6-7e01-40f1-a7fa-db9820f841e2', '2025-11-08');