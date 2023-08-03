import React, { Dispatch, SetStateAction } from 'react';

type ModalProps = {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

export default function Modal({
  modalOpen,
  setModalOpen,
  children,
}: ModalProps) {
  return (
    <>
      {modalOpen ? (
        <div className="bg-black/50 fixed inset-0">
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-end bg-slate-500 w-full m-2 md:w-1/3 p-5">
              <button
                onClick={() => setModalOpen(false)}
                className="text-2xl mb-3"
              >
                &times;
              </button>

              {children}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
