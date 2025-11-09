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
    console.log("CafesPages")

    useEffect(() => {
        console.log("fetching cafes")
        const fetchCafes = async () => {
            try {
                console.log("awaiting api")
                const cafes = await CafesAPI["list"](location);
                console.log("receive api result ", cafes)
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
                const BASE_URL = import.meta.env.VITE_API_URL
                const defaultImg = BASE_URL + "/uploads/noImageFound.png"
                const imgURL = params.value ? BASE_URL + params.value : defaultImg
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
            flex: 1
        },
        {
            field: "name",
            flex: 1
        },
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
            },
            flex: 1
        },
    ]);

    return (<>
        {/* Height = 100vh - header height - layout vertical padding */}
        <div className="flex flex-col" style={{ height: 'calc(100vh - 64px - 48px)' }}>
            <div className="flex-1 overflow-auto">
                <AgGridReact
                    rowData={cafes}
                    columnDefs={colDefs}
                    domLayout="normal"
                    rowHeight={100}
                />
            </div>
            <div className="mt-2 p-2 bg-white shadow">
                <AddCafeButton />
            </div>
        </div>
    </>)
}


