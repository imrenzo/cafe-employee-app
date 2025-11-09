import { Layout } from 'antd';
import { CustomHeader } from './CustomHeader';
const { Content } = Layout;

// Defines entire app layout
export const AppLayout = ({ children }) => {
    return (
        <Layout>
            {/* Header visible on all pages */}
            <CustomHeader />
            <Layout>
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        borderRadius: 0,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export const CenteredPage = ({ children }) => {
    return <div className="centered-page">{children}</div>;
};

