import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router';
import { useUnsavedChangesWarning } from '../hooks/useUnsavedChangesWarning';

const { Header } = Layout;

export function CustomHeader() {
    const { showWarning, WarningModal } = useUnsavedChangesWarning();
    const navigate = useNavigate();
    // If confirm navigate to required dst. In this case is previous page
    const handleClick = (dst) => showWarning(() => navigate(dst))

    const headerItems = [
        { key: '1', label: <a onClick={() => handleClick('/')}>Cafes</a> },
        { key: '2', label: <a onClick={() => handleClick('/employees')}>Employees</a> },
    ];

    return (<>
        <Header>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                items={headerItems}
                style={{
                    borderBottom: 'none',
                    background: '#4096ff',
                    paddingLeft: '5%'
                }}
            />
        </Header>
        <WarningModal />
    </>)
}
