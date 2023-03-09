import { Helmet } from 'react-helmet';
import { FiWifiOff } from 'react-icons/fi';

import { Header } from '../components/Header';

export function OfflinePage() {
  return (
    <>
      <Helmet>
        <title>Offline | JosueApp</title>
      </Helmet>
      <Header />
      <div className="text-neutral-600 h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-4rem)] p-4 flex flex-col gap-6 items-center justify-center">
        <div className="text-center flex flex-col gap-2 items-center justify-center">
          <h1 className="text-2xl font-bold ">
            Parece que você está offline...
          </h1>
          <p>Conecte-se à internet para utilizar o JosueApp</p>
        </div>
        <FiWifiOff size={40} />
        <a
          href="/"
          className="block bg-primary-800 hover:brightness-90 active:brightness-90 transition text-neutral-50 font-bold px-4 py-2 rounded-lg"
        >
          Recarregar
        </a>
      </div>
    </>
  );
}
