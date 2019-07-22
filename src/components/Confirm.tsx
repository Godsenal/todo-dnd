import React from "react";
import { Modal } from ".";
import { ModalProps } from "./Modal";

interface ConfirmProps extends Omit<ModalProps, 'children'> {
  title: string;
  message: string;
  agreeLabel?: string;
  disagreeLabel?: string;
  onAgree: () => void;
  onDisagree: () => void;
}

const Confirm: React.SFC<ConfirmProps> = ({
  title,
  message,
  agreeLabel = "Confirm",
  disagreeLabel = "Cancle",
  onAgree,
  onDisagree,
  ...props
}) => {
  return (
    <Modal {...props}>
      <h3 className="text-center text-2xl">{title}</h3>
      <p className="text-center text-gray-500 p-6">{message}</p>
      <div className="text-right">
        <button className="py-2 px-3 my-2 rounded" onClick={onDisagree}>
          Cancle
        </button>
        <button
          className="text-white bg-red-500 hover:bg-red-700 py-2 px-3 my-2 mx-2 rounded"
          onClick={onAgree}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default Confirm;
