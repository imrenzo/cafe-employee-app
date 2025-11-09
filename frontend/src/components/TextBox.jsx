import { Input } from "antd"
import Form from "antd/es/form/Form"

export default function Textbox({ name, label, minLength = 0, maxLength, required = false, type }) {
    return (<Form.Item
        label={label}
        name={name}
        rules={[
            { required, message: `${label} is required` },
            minLength && { min: minLength, message: `${label} must be at least ${minLength} characters` },
            maxLength && { max: maxLength, message: `${label} cannot exceed ${maxLength} characters` },
            getValidator(type)
        ].filter(Boolean)}
    >
        <Input />
    </Form.Item>)
}

// get validator for email and phone number validation
function getValidator(type) {
    const emailRegEx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const phoneRegEx = /^[8-9][0-9]{7}$/;

    if (type === "email") {
        return {
            validator: (_, value) =>
                !value || emailRegEx.test(value) ? Promise.resolve() : Promise.reject(new Error("Invalid email")),
        };
    }

    if (type === "phone") {
        return {
            validator: (_, value) =>
                !value || phoneRegEx.test(value) ? Promise.resolve() : Promise.reject(new Error("Invalid phone number")),
        };
    }

    return {};
}