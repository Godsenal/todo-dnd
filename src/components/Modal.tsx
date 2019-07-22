import React, { memo, useRef } from "react";
import { useOutsideClick } from "../hooks";

export interface ModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.SFC<ModalProps> = ({ open, title, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(modalRef, onClose);
  return (
    <>
      <dialog
        className="fixed w-full h-full inset-0"
        open={open}
        style={{ backgroundColor: "rgba(0,0,0,.64)" }}
      >
        <div ref={modalRef} className="w-1/3 mx-auto my-40">
          {title && (
            <div className="w-full mb-3 text-center font-bold text-2xl text-white">
              {title}
            </div>
          )}
          <div className="w-full bg-white px-3 py-2 bg-white rounded">
            <div className="w-full text-right">
              <button onClick={onClose}>
                <i className="fas fa-times" />
              </button>
            </div>
            {children}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default memo(Modal);
