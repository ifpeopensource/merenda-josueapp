import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

export function ConfirmationModal({
  isOpen,
  closeModal,
  onNo,
  onYes,
  message,
}) {
  return (
    <Transition show={isOpen}>
      <Dialog onClose={closeModal} className="fixed z-50 inset-0">
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-110"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="fixed top-1/2 left-1/2 m-4 w-[calc(100%-2rem)] max-w-xl max-h-[calc(100%-2rem)] translate-x-[calc(-50%-1rem)] translate-y-[calc(-50%-1rem)] bg-neutral-50 rounded-lg py-6 px-4 flex flex-col gap-6 justify-center">
            <p>{message}</p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="bg-red-500 text-neutral-50 hover:brightness-90 active:brightness-90 transition shadow-sm w-fit rounded-lg px-8 py-2 font-bold"
                onClick={onNo}
              >
                Não
              </button>
              <button
                type="button"
                className="bg-primary-800 text-neutral-50 hover:brightness-90 active:brightness-90 transition shadow-sm w-fit rounded-lg px-8 py-2 font-bold"
                onClick={onYes}
              >
                Sim
              </button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

ConfirmationModal.propTypes = {
  message: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onNo: PropTypes.func,
  onYes: PropTypes.func,
};
