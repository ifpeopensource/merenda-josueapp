import { Header } from '../components/Header';

import ifpeRecifeLogo from '../assets/ifpe_recife.webp';
import ifosLogo from '../assets/ifos.svg';

export function Login() {
  return (
    <>
      <Header />
      <div className="p-4 pt-8 max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-neutral-900">Login</h1>
        <form className="flex flex-col gap-2 mt-12 text-neutral-900">
          <input
            className="bg-neutral-200 px-4 py-2 rounded-md"
            placeholder="E-mail"
            type="email"
            name="email"
            id="email"
          />
          <input
            className="bg-neutral-200 px-4 py-2 rounded-md"
            placeholder="Senha"
            type="password"
            name="password"
            id="password"
          />
          <button
            className="bg-primary-800 hover:brightness-90 transition text-neutral-50 font-bold px-4 py-2 rounded-md"
            type="submit"
          >
            Entrar
          </button>
        </form>
        <div className="flex mt-20 items-center justify-center gap-10">
          <img
            className="h-28"
            src={ifpeRecifeLogo}
            alt="IFPE - Campus Recife"
          />
          <img className="h-28" src={ifosLogo} alt="IFPE Open Source" />
        </div>
      </div>
    </>
  );
}
