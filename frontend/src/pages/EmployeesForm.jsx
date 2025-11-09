import {
    Button,
    Form,
    message,
    Radio,
    Select,
} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CafesAPI, EmployeesAPI } from '../api';
import Textbox from '../components/TextBox';
import WarnButton from '../components/WarnButton';
import { useDispatch, useSelector } from 'react-redux';
import { setClean, setDirty } from '../redux/slices/formSlice';

export default function EmployeesForm({ required = false }) {
    const location = useLocation();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const employeeData = location.state?.employeeData;
    const navigate = useNavigate();
    const [cafeNames, setCafeNames] = useState()

    // To get values for dropdown box of cafe names
    useEffect(() => {
        const fetchCafes = async () => {
            try {
                const cafeNames = await CafesAPI["list"](location);
                const cafe_name_id = cafeNames.data.map(c => { return { label: c.name, value: c.id } })
                setCafeNames(cafe_name_id)
            } catch (err) {
                console.error("Error fetching employees: ", err)
            }
        }
        fetchCafes()
    }, [])

    // Set form initial values for edit
    useEffect(() => {
        if (required && cafeNames) { 
            // Get assignedCafe name for intiial form values
            const selectedCafeId = cafeNames.find(c => c.label === employeeData.cafe_name)?.label;
            form.setFieldsValue({
                name: employeeData.employee_name,
                emailAddress: employeeData.email_address,
                phoneNumber: employeeData.phone_number,
                gender: employeeData.gender,
                assignedCafe: selectedCafeId
            })
        }
    }, [employeeData, cafeNames, form, required]);

    const handleSubmit = async (values) => {
        const { name: name, emailAddress: emailAddress, phoneNumber: phoneNumber, gender: gender, assignedCafe: assignedCafe } = values
        try {
            // PUT /employees
            if (required) {
                const payload = {
                    employeeId: employeeData.id,
                    name: name,
                    emailAddress: emailAddress,
                    phoneNumber: phoneNumber,
                    gender: gender,
                    newCafeId: assignedCafe,
                    start_date: '2024-01-01'
                }
                const res = await EmployeesAPI["update"](payload)
                const { error } = res.data
                if (error) {
                    throw new Error("Error updating employee ", name)
                } else {
                    messageApi.info('Successfully updated employee: ' + name);
                    navigate(-1);
                }
            } else {
                // POST /employees
                const payload = {
                    name: name,
                    emailAddress: emailAddress,
                    phoneNumber: phoneNumber,
                    gender: gender,
                    cafeId: assignedCafe
                }
                const res = await EmployeesAPI["create"](payload)
                const { error } = res.data
                if (error) {
                    throw new Error("Error updating ", error.message)
                } else {
                    messageApi.info('Successfully added cafe: ' + name);
                    navigate(-1);
                }
            }
        } catch (err) {
            messageApi.info('Failed to make req: ' + err);
        }
    };

    // Check whether form values has been changed
    const dispatch = useDispatch()
    const isDirty = useSelector(state => state.form.isDirty)

    // warning message: handles browser native navigation e.g. reloading page
    useEffect(() => {
        if (!isDirty) return;

        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            dispatch(setClean())
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [dispatch, isDirty]);

    return (<div style={{ width: '100%', maxWidth: 600 }}>
        {contextHolder}
        <Form
            form={form}
            labelCol={{ span: 6 }}
            layout="horizontal"
            size="default"
            style={{ maxWidth: 600 }}
            onFinish={handleSubmit}
            onValuesChange={() => { dispatch(setDirty()) }}
            labelAlign="left"
        >
            <Textbox label="Name" name="name" minLength={6} maxLength={10} required />
            <Textbox label="Email Address" name="emailAddress" type="email" required />
            <Textbox label="Phone Number" name="phoneNumber" type="phone" required />
            <Form.Item name="gender" label="Gender">
                <Radio.Group>
                    <Radio value="male"> Male </Radio>
                    <Radio value="female"> Female </Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item name="assignedCafe" label="Assigned Café" rules={[{ required: true }]}>
                <Select
                    placeholder="Select a cafe to assign"
                    options={cafeNames}
                />
            </Form.Item>
            <div className='flex flex-row space-x-5'>
                <WarnButton className='w-1/2' />
                <Button htmlType="submit" type="primary" className='w-1/2'>Submit</Button>
            </div>
        </Form>
    </div>);
};
