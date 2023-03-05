import { Helmet } from 'react-helmet';

import { Header } from '../components/Header';

import ifpeRecifeLogo from '../assets/ifpe_recife.webp';
import ifosLogo from '../assets/ifos.svg';
import { useForm } from 'react-hook-form';

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
    // TODO: Implement authentication
  }

  return (
    <>
      <Helmet>
        <title>Login | JosueApp</title>
      </Helmet>
      <Header />
      <div className="p-4 pt-8 max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-neutral-900">Login</h1>
        <form
          className="flex flex-col gap-2 mt-12 text-neutral-900"
          onSubmit={handleSubmit(onSubmit)}
        >
          {errors.email && (
            <span className="text-red-500 text-sm">Digite seu email</span>
          )}
          <input
            className="bg-neutral-200 px-4 py-2 rounded-md"
            placeholder="E-mail"
            type="email"
            {...register('email', { required: true })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">Digite sua senha</span>
          )}
          <input
            className="bg-neutral-200 px-4 py-2 rounded-md"
            placeholder="Senha"
            type="password"
            {...register('password', { required: true })}
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
