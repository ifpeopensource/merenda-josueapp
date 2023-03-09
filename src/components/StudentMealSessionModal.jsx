import { Dialog } from '@headlessui/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function Error({ isOpen, closeModal, message, studentData, description }) {
  return (
    <Dialog open={isOpen} onClose={closeModal} className="fixed z-50 inset-0">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

      <Dialog.Panel className="fixed top-1/2 left-1/2 m-4 w-[calc(100%-2rem)] max-w-5xl max-h-[calc(100%-2rem)] translate-x-[calc(-50%-1rem)] translate-y-[calc(-50%-1rem)] bg-red-500 rounded-lg py-6 px-4 flex flex-col items-center justify-center">
        {!studentData && (
          <Dialog.Title className="font-bold text-neutral-50 text-center text-xl">
            {message}:
          </Dialog.Title>
        )}
        {!studentData && (
          <p className="text-center font-semibold text-neutral-50 text-2xl mt-2 break-words max-w-full">
            {description}
          </p>
        )}

        <button
          className="bg-neutral-50 hover:brightness-90 active:brightness-90 transition shadow-sm w-fit rounded-lg px-8 py-2 font-bold mt-4"
          type="button"
          onClick={closeModal}
        >
          Voltar
        </button>
      </Dialog.Panel>
    </Dialog>
  );
}

Error.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  message: PropTypes.string,
  studentData: PropTypes.shape({
    name: PropTypes.string,
    studentId: PropTypes.string,
    email: PropTypes.string,
  }),
  description: PropTypes.string,
};

function Success({ isOpen, closeModal, studentData }) {
  if (!studentData) return null;

  const [timer, setTimer] = useState(5);
  const [isTimerCanceled, setTimerCanceled] = useState(false);
  const [intervalId, setIntervalId] = useState(false);

  useEffect(() => {
    const newIntervalId = setInterval(() => {
      if (isTimerCanceled) return;
      setTimer((prev) => prev - 1);
    }, 1000);

    setIntervalId(newIntervalId);

    return () => {
      clearInterval(newIntervalId);
    };
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      closeModal();
    }
  }, [timer]);

  return (
    <Dialog open={isOpen} onClose={closeModal} className="fixed z-50 inset-0">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
      <Dialog.Panel className="fixed top-1/2 left-1/2 m-4 w-[calc(100%-2rem)] max-w-5xl max-h-[calc(100%-2rem)] translate-x-[calc(-50%-1rem)] translate-y-[calc(-50%-1rem)] bg-green-600 rounded-lg">
        <button
          className="w-full h-full py-6 px-4 flex flex-col items-center justify-center"
          onClick={() => {
            setTimerCanceled(true);
            clearInterval(intervalId);
          }}
        >
          <div className="flex flex-col items-center justify-center gap-6">
            <img
              className="w-32 h-32 object-cover rounded-full text-center text-neutral-50"
              src={studentData.pictureUrl}
              alt={`Foto de ${studentData.name}`}
            />

            <div className="flex flex-col items-center justify-center gap-1">
              <Dialog.Title className="font-bold text-neutral-50 text-center text-2xl">
                {studentData.name}
              </Dialog.Title>
              <p className="text-center text-neutral-50 text-sm break-words">
                {studentData.studentId}
              </p>
              <p className="text-center text-neutral-50 text-sm break-words">
                {studentData.email}
              </p>
            </div>
          </div>

          <button
            className="bg-neutral-50 hover:brightness-90 active:brightness-90 transition shadow-sm w-fit rounded-lg px-8 py-2 font-bold mt-4"
            type="button"
            onClick={closeModal}
          >
            Voltar
          </button>

          {!isTimerCanceled && (
            <div className="mt-2 text-neutral-50 text-sm">
              <p>Voltando em {timer}s...</p>
              <p>(clique na janela para parar)</p>
            </div>
          )}
        </button>
      </Dialog.Panel>
    </Dialog>
  );
}

Success.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  studentData: PropTypes.shape({
    name: PropTypes.string,
    studentId: PropTypes.string,
    email: PropTypes.string,
    pictureUrl: PropTypes.string,
  }),
};

export const StudentMealSessionModal = {
  Error,
  Success,
};
