// Contains button for Employees page table
import { Button } from 'antd'
import { Link } from 'react-router-dom';
import { EmployeesAPI } from '../api';

export function EmployeePageButton({ data }) {
  const { name: cafeName, employees } = data
  return (<>
    <Link to={`/employees/cafe/${cafeName}`}>
      <Button color='default'>{employees}</Button>
    </Link>
  </>)
}

const handleDelete = async ({ data, onDelete }) => {
  try {
    const payload = { employeeId: data.id }
    await EmployeesAPI["delete"](payload)
    onDelete(data.id)
  } catch (err) {
    console.error("Failed to delete employee", err);
  }
}

export function EmployeeTableButton({ data, onDelete }) {
  return (<div className='flex flex-row flex-2 space-x-2 items-center'>
    <Link to={`/employees/edit`} state={{ employeeData: data }}>
      <Button color="cyan" variant="solid">Edit</Button>

    </Link>
    <Button type="default" danger onClick={() => handleDelete({ data, onDelete })}>Delete</Button>
  </div>);
}

export function AddEmployeeButton() {
  return (<Link to={'/employees/add'}>
    <Button type="primary" className='mt-4 w-full'>Add new employee</Button>
  </Link>);
}