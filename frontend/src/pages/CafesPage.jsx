import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from 'react';
import { CafesAPI } from '../api';
import { EmployeePageButton } from '../components/EmployeeButton';
import { AddCafeButton, CafeTableButton } from '../components/CafeButton';
import { ModuleRegistry } from 'ag-grid-community';
import { SetFilterModule } from 'ag-grid-enterprise';
ModuleRegistry.registerModules([SetFilterModule]);

export default function CafesPages() {
    const [cafes, setCafes] = useState(null)
    const [location, _] = useState(null)

    useEffect(() => {
        const fetchCafes = async () => {
            try {
                const cafes = await CafesAPI["list"](location);
                setCafes(cafes.data)
            } catch (err) {
                console.error("Error fetching cafes: ", err)
            }
        }
        fetchCafes()
    }, [location])

    return (<>
        <CafesTable cafes={cafes} setCafes={setCafes} />
    </>)
}

function CafesTable({ cafes, setCafes }) {
    const [colDefs, _] = useState([
        {
            headerName: "Logo",
            field: "logo",
            cellRenderer: (params) => {
                const defaultImg = "http://localhost:3000/uploads/noImageFound.png"
                const imgURL = params.value ? "http://localhost:3000" + params.value : defaultImg
                return (
                    <img
                        src={imgURL}
                        alt="Cafe Logo"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                        }}
                        className='pt-1 pb-1'
                        onError={(e) => { e.target.src = defaultImg; }}
                    />
                )
            },
        },
        { field: "name" },
        {
            field: "description",
            cellStyle: { 'whiteSpace': 'normal' },
            autoHeight: true,
            flex: 1 // to stretch table so that no whitespace on right side of actions column
        },
        {
            field: "employees",
            cellRenderer: EmployeePageButton,
        },
        { field: "location", filter: "agSetColumnFilter" },
        {
            colId: "actions",
            headerName: "Actions",
            cellRenderer: CafeTableButton,
            cellRendererParams: {
                onDelete: (deletedId) => {
                    setCafes(prev => prev.filter(cafe => cafe.id !== deletedId));
                }
            }
        },
    ]);

    return (<>
        <div className="flex flex-col h-[75vh]">
            {/* Grid only takes up (75vh - space for <AddEmployeeButton/>) */}
            <div className="flex-1 overflow-auto">
                <AgGridReact
                    rowData={cafes}
                    columnDefs={colDefs}
                    domLayout="normal"
                    rowHeight={100}
                />
            </div>

            {/* Button below */}
            <div className="mt-2">
                <AddCafeButton />
            </div>
        </div>
    </>)
}


