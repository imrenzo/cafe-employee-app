## Database

The application uses a PostgreSQL database. The initialization script is [here](../init.sql)

### Tables

#### `employees`
Stores employee information.

- `seq_id` (BIGINT): Auto-incrementing sequence for generating IDs  
- `id` (CHAR(9)): Primary key, formatted as `'UI0000001'`, `'UI0000002'`, etc.  
- `name` (VARCHAR(100)): Employee full name  
- `email_address` (VARCHAR(255)): Unique, validated with regex  
- `phone_number` (CHAR(8)): Starts with 8 or 9, validated with regex  
- `gender` (VARCHAR(6)): `'male'` or `'female'`  

#### `cafes`
Stores cafe information.

- `id` (UUID): Primary key  
- `name` (VARCHAR(100))  
- `description` (VARCHAR(255))  
- `logo` (TEXT): URL or path to image  
- `location` (VARCHAR(255)): Lowercase only  

#### `employee_cafe`
Associates employees with cafes.

- `employee_id` (CHAR(9)): Foreign key to `employees(id)`  
- `cafe_id` (UUID): Foreign key to `cafes(id)`  
- `start_date` (DATE)  

### Sequences

- `employee_seq`: Auto-incrementing sequence used for generating employee IDs  

### Seed Data

- 50 employees with randomized names, emails, phone numbers, and genders  
- 10 cafes with names, descriptions, locations, and logos  
- Employees randomly assigned to cafes with a `start_date` within the last 30 days  

The seed scripts use PostgreSQL `DO $$ ... $$` blocks to populate tables automatically.

## Overall Techstack

Frontend: ReactJS, AG Grid, Ant Design, Vite, Reduxjs, Tailwindcss, Axios

Backend: Express.js, dayjs, multer, pg, pg-promise

Database: PostgreSQL

Tools: Render (Deployment), Docker