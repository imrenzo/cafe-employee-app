// Contains button for Cafes page table

import { Button } from 'antd'
import { Link } from 'react-router-dom';
import { CafesAPI } from '../api';

const handleDelete = async ({ data, onDelete }) => {
    try {
        const payload = { cafeId: data.id }
        await CafesAPI["delete"](payload)
        onDelete(data.id)
    } catch (err) {
        console.error("Failed to delete cafe", err);
    }
}

export function CafeTableButton({ data, onDelete }) {
    return (<div className='flex flex-row flex-2 space-x-2 items-center'>
        <Link to={`/cafes/edit`} state={{ cafeData: data }}>
            <Button color="cyan" variant="solid">Edit</Button>
        </Link>
        <Button type="default" danger onClick={() => handleDelete({ data, onDelete })}>Delete</Button>
    </div>);
}

export function AddCafeButton() {
    return (
        <Link to={'/cafes/add'}>
            <Button type="primary" className='mt-4 w-full'>Add new cafe</Button>
        </Link>
    );
}