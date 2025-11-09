import { Button } from 'antd';
import { useNavigate } from 'react-router';
import { useUnsavedChangesWarning } from '../hooks/useUnsavedChangesWarning';

// When user clicks on Cancel button: if data is changed then show the Modal warning, else return to previous page
export default function WarnButton({ className }) {
    const { showWarning, WarningModal } = useUnsavedChangesWarning();
    const navigate = useNavigate();

    // If confirm navigate to required dst. In this case is previous page
    const handleClick = (dst) => showWarning(() => navigate(dst))
    return (<>
        <Button onClick={() => handleClick(-1)} danger className={className}>
            Cancel
        </Button >
        <WarningModal />
    </>);
}

