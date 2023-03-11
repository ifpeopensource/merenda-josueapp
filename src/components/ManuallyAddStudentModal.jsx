import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

import { Input } from './Input';
import { useForm } from 'react-hook-form';

export function ManuallyAddStudentModal({ isOpen, closeModal, onAdd }) {
  const { register, handleSubmit, reset } = useForm();

  function onSubmit(data) {
    onAdd(data.studentId);
    closeModal();
    reset();
  }

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
          <Dialog.Panel className="fixed top-1/2 left-1/2 m-4 w-[calc(100%-2rem)] max-w-xl max-h-[calc(100%-2rem)] translate-x-[calc(-50%-1rem)] translate-y-[calc(-50%-1rem)] bg-neutral-50 rounded-lg py-6 px-4 flex flex-col gap-3 justify-center">
            <Dialog.Title className="font-medium text-lg">
              Adicionar Estudante
            </Dialog.Title>
            <form
              className="flex flex-col gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                label="Matrícula"
                {...register('studentId', { required: true })}
              />
              <div className="flex justify-between gap-2">
                <button
                  type="button"
                  className="bg-red-500 text-neutral-50 hover:brightness-90 active:brightness-90 transition shadow-sm w-fit rounded-lg px-8 py-2 font-bold"
                  onClick={() => {
                    closeModal();
                    reset();
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-primary-800 text-neutral-50 hover:brightness-90 active:brightness-90 transition shadow-sm w-fit rounded-lg px-8 py-2 font-bold"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

ManuallyAddStudentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onAdd: PropTypes.func,
};
