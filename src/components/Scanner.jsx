import { useZxing } from 'react-zxing';
import { FiSun } from 'react-icons/fi';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { ElapsedTime } from './ElapsedSessionTime';

export function Scanner({ onQrCodeResult, onSessionEnd, elapsedTime }) {
  const { ref: videoRef, torch } = useZxing({
    onResult(result) {
      onQrCodeResult(result.getText());
    },
  });
  return (
    <>
      <div className="absolute z-10 w-full h-full flex flex-col justify-between items-center">
        <div className="flex items-center justify-center mt-16">
          <h1 className="text-lg text-center text-neutral-50 font-bold">
            Sessão iniciada há
            <br />
            <ElapsedTime elapsedTime={elapsedTime} />
          </h1>
        </div>

        <div className="flex flex-col max-sm:w-4/5 gap-4 items-center justify-center mb-10">
          <div className="flex gap-2 items-center">
            <h1 className="text-sm text-neutral-50">
              Aponte a câmera para o QR Code
            </h1>
            {torch.isAvailable && (
              <button
                className={clsx('p-2 rounded-lg shadow-md', {
                  'bg-slate-300 text-neutral-900': !torch.isOn,
                  'bg-slate-700 text-neutral-50': torch.isOn,
                })}
                type="button"
                onClick={() => (torch.isOn ? torch.off() : torch.on())}
              >
                <FiSun />
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <a
              href="/"
              className="bg-primary-800 text-center disabled:cursor-progress hover:brightness-90 transition text-neutral-50 text-lg font-bold px-4 py-3 rounded-md"
            >
              Voltar para a tela inicial
            </a>
            <button
              className="bg-red-500 disabled:cursor-progress hover:brightness-90 transition text-neutral-50 text-lg font-bold px-4 py-3 rounded-md"
              type="button"
              onClick={onSessionEnd}
            >
              Encerrar sessão
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-full absolute after:absolute after:rounded-lg after:top-1/2 after:left-1/2 after:w-64 after:h-64 after:-translate-x-1/2 after:-translate-y-2/3 after:shadow-[0_0_0_1500px_rgba(0,0,0,0.5)]" />
      <video
        className="object-cover h-full w-full absolute -z-10"
        ref={videoRef}
      />
    </>
  );
}

Scanner.propTypes = {
  onQrCodeResult: PropTypes.func.isRequired,
  onSessionEnd: PropTypes.func.isRequired,
  elapsedTime: PropTypes.shape({
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
  }).isRequired,
};
