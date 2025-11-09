import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EmployeesAPI } from '../api';
import { AgGridReact } from 'ag-grid-react';
import { AddEmployeeButton, EmployeeTableButton } from '../components/EmployeeButton';

export default function EmployeesPage() {
    const { cafeName } = useParams();
    const [employees, setEmployees] = useState()

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const employees = await EmployeesAPI["list"](cafeName);
                setEmployees(employees.data)
            } catch (err) {
                console.error("Error fetching employees: ", err)
            }
        }
        fetchEmployees()
    }, [cafeName])

    return (
        <>
            <EmployeesTable employees={employees} setEmployees={setEmployees} />
        </>
    );
}

function EmployeesTable({ employees, setEmployees }) {
    const [colDefs, _] = useState([
        {
            headerName: 'Employee id',
            field: "id"
        },
        {
            headerName: 'Name',
            field: "employee_name"
        },
        {
            headerName: 'Email Address',
            field: "email_address",
        },
        {
            headerName: 'Phone number',
            field: "phone_number",
        },
        {
            headerName: 'Days worked in the café',
            field: "dayDiff"
        },
        {
            headerName: 'Café name',
            field: "cafe_name"
        },
        {
            colId: "actions",
            headerName: "Actions",
            cellRenderer: EmployeeTableButton,
            cellRendererParams: {
                onDelete: (deletedId) => {
                    setEmployees(prev => prev.filter(cafe => cafe.id !== deletedId));
                }
            },
            flex: 1 // to stretch table so that no whitespace on right side of actions column
        },
    ]);

    return (
        <div className="flex flex-col h-[75vh]">
            {/* Grid only takes up (75vh - space for <AddEmployeeButton/>) */}
            <div className="flex-1 overflow-auto">
                <AgGridReact
                    rowData={employees}
                    columnDefs={colDefs}
                    domLayout="normal"
                />
            </div>

            {/* Button below */}
            <div className="mt-2">
                <AddEmployeeButton />
            </div>
        </div>
    )
}

