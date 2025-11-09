import { IMAGE_URL } from "../api";
import { message } from 'antd';

const getUploadProps = (form) => ({
    name: 'file',
    action: IMAGE_URL,
    headers: {
        authorization: 'authorization-text',
    },
    beforeUpload(file) {
        // convert bytes → MB then check if < 2 MB
        const lessThan2MB = file.size / 1024 / 1024 < 2; 
        if (!lessThan2MB) {
            message.error('Image must be smaller than 2MB!');
        }
        return lessThan2MB; // returning false blocks upload
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            const url = info.file.response.url;
            message.success(`${info.file.name} file uploaded successfully`);
            form.setFieldsValue({ logo: url });
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    listType: 'picture',
    maxCount: 1,
});

export default getUploadProps