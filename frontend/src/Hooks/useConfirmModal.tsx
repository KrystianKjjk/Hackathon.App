import React, { useState } from "react";
import Modal from "react-modal";

import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

Modal.setAppElement("#ModalElement");

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column" as "column",
        display: "flex",
    },
};

interface ModalProps extends ModalValue {
    visibility: boolean;
}
interface ModalValue {
    text?: string;
    handleNo?: () => void;
    handleYes?: () => void;
}
const ConfirmModal: React.FC<ModalProps> = ({
    visibility,
    text,
    handleNo,
    handleYes,
}) => {
    return (
        <Modal
            isOpen={visibility}
            onRequestClose={handleNo}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <HelpOutlineIcon fontSize="large" />
            <h3>{text}</h3>
            <div>
                <button onClick={handleNo}>NO</button>
                <button onClick={handleYes}>YES</button>
            </div>
        </Modal>
    );
};

const useConfirmModal = (): [JSX.Element, (modalValue: ModalValue) => void] => {
    const [confirmData, setConfirmData] = useState<ModalProps>({
        visibility: false,
    });

    const closeModal = () => setConfirmData({ visibility: false });

    const setModal = ({ text, handleYes, handleNo }: ModalValue) => {
        if (confirmData.visibility) return;

        const newHandleNo = () => {
            handleNo && handleNo();
            closeModal();
        };
        setConfirmData({
            text,
            handleYes,
            handleNo: newHandleNo,
            visibility: true,
        });
    };

    return [<ConfirmModal {...confirmData} />, setModal];
};

export default useConfirmModal;
