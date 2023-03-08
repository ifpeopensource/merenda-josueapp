import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export function MailSession() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="pb-7">
      <h3 className="text-4xl font-semibold">Sessão de merenda</h3>
      <p className="text-2xl pb-4 font-medium">Iniciada às 14:30</p>

      <button
        className="text-2xl rounded-lg bg-red-600 p-4 pl-10 pr-10 font-bold text-white"
        onClick={openModal}
      >
        Excluir
      </button>
      <button className="text-2xl rounded-lg bg-lime-600 p-4 pl-10 pr-10 font-bold text-white float-right">
        Entrar
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={closeModal} className="fixed inset-0">
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
            <span className="inline-block h-screen align-middle" />
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-110"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-2xl p-10 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title className="text-4xl font-bold text-gray-900">
                  Encerrar Sessão
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-2xl text-gray-500 pb-3">
                    Você tem certeza que deseja encerrar esta sessão?
                  </p>
                </div>
                <div className="mt-4 flex justify-between">
                  <button
                    className="text-xl rounded-lg bg-red-600 p-4 pl-16 pr-16 font-bold text-white"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                  <button className="text-xl rounded-lg bg-lime-600 p-4 pl-16 pr-16 font-bold text-white">
                    Encerrar
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
