import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClean } from "../redux/slices/formSlice";
import { Button, Modal } from "antd";

// Handles displaying of warning modal message when form is dirty
// Form is dirty as long as user changes any fields in form
export function useUnsavedChangesWarning() {
    const isDirty = useSelector(state => state.form.isDirty);
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);
    const [callback, setCallback] = useState(null);

    const showWarning = (onConfirm) => {
        if (isDirty) {
            setCallback(() => onConfirm); // Store navigate
            setModalVisible(true);
        } else {
            onConfirm?.() // Navigate to dest
        }
    };

    const handleOk = () => {
        setModalVisible(false);
        dispatch(setClean())
        callback?.() // Navigate to dest
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const WarningModal = () => (
        <Modal
            open={modalVisible}
            title="Warning"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Return
                </Button>,
                <Button key="submit" type="primary" danger onClick={handleOk}>
                    Confirm Cancel
                </Button>,
            ]}
        >
            <p>There are unsaved changes on the page.</p>
        </Modal>
    )

    return { showWarning, WarningModal }
}