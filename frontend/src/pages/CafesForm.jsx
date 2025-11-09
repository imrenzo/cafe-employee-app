import { Button, Form, message, Upload } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { CafesAPI } from '../api';
import Textbox from '../components/TextBox';
import WarnButton from '../components/WarnButton';
import { useDispatch } from 'react-redux';
import { setClean, setDirty } from '../redux/slices/formSlice';
import { UploadOutlined } from '@ant-design/icons';
import getUploadProps from '../props/uploadImageProps';
import { useState } from 'react';

export default function CafesForm({ required = false }) {
    const location = useLocation();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const cafeData = location.state?.cafeData;
    const navigate = useNavigate();

    // Set form initial values for edit
    useEffect(() => {
        if (required) {
            form.setFieldsValue({
                name: cafeData.name,
                location: cafeData.location,
                description: cafeData.description,
                logo: cafeData.logo,
            })
        }
    }, []);

    const handleSubmit = async (values) => {
        const { name, location, description, logo } = values
        try {
            if (required) {
                const payload = {
                    cafeId: cafeData.id,
                    name: name,
                    description: description,
                    logo: logo,
                    location: location
                }
                const res = await CafesAPI["update"](payload)
                const { error } = res.data
                if (error) {
                    throw new Error("Error updating ", name)
                } else {
                    messageApi.info('Successfully updated: ' + name);
                    dispatch(setClean())
                    navigate(-1);
                }
            } else {
                const payload = {
                    name: name,
                    description: description,
                    location: location,
                    logo: logo
                }
                const res = await CafesAPI["create"](payload)
                const { error } = res.data
                if (error) {
                    throw new Error("Error updating ", error.message)
                } else {
                    messageApi.info('Successfully added cafe: ' + name);
                    navigate("/");
                }
            }
        } catch (err) {
            messageApi.info('Failed to make req: ' + err);
        }
    };

    // Check whether form values has been changed
    const dispatch = useDispatch()
    const [localDirty, setLocalDirty] = useState(false);
    // warning message: handles browser native navigation e.g. Reloading page
    useEffect(() => {
        if (!localDirty) return;

        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [localDirty]);

    const handleValuesChange = () => {
        if (!localDirty) {
            setLocalDirty(true)
            dispatch(setDirty())
        }
    }

    return (<div style={{ width: '100%', maxWidth: 600 }}>
        {contextHolder}
        <Form
            form={form}
            labelCol={{ span: 4 }}
            layout="horizontal"
            size="default"
            style={{ maxWidth: 600 }}
            onFinish={handleSubmit}
            onValuesChange={handleValuesChange}
            labelAlign="left"
        >
            <Textbox label="Name" name="name" minLength={6} maxLength={10} required />
            <Textbox label="Description" name="description" maxLength={256} required />
            <Form.Item label="Logo" name="logo">
                <Upload {...getUploadProps(form)}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form.Item>
            <Textbox label="Location" name="location" />
            <div className='flex flex-row space-x-5'>
                <WarnButton className='w-1/2' />
                <Button htmlType="submit" type="primary" className='w-1/2'>Submit</Button>
            </div>
        </Form >
    </div >);
};

