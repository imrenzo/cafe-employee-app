# Cafe Management App

A React application to manage cafes and their employees. The app provides functionality to view, add, edit, delete cafes and employees.

## Table of Contents

- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Project Structure](#project-structure)  
- [Routes](#routes)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Contributing](#contributing)  
- [License](#license)  

## Features

- View a list of cafes  
- View employees of a specific cafe  
- Add and edit employees  
- Add and edit cafes  
- Responsive and centered forms for a better user experience  

## Technologies Used

- ReactJS
- AG Grid
- Ant Design
- Vite
- Reduxjs
- Tailwindcss
- Axios


## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `CafesPages` | Displays a list of cafes |
| `/employees/` | `EmployeesPage` | Displays a list of all employees |
| `/employees/cafe/:cafeName` | `EmployeesPage` | Displays employees for a specific cafe |
| `/employees/add` | `EmployeesForm` | Add a new employee (centered page) |
| `/employees/edit` | `EmployeesForm` | Edit an existing employee (centered page) |
| `/cafes/add` | `CafesForm` | Add a new cafe (centered page) |
| `/cafes/edit` | `CafesForm` | Edit an existing cafe (centered page) |

## Notes

- Data validation is done in the Forms to ensure constraints are met before being passed to backend.