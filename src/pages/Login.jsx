import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

import { Header } from '../components/Header';

import { api } from '../services/api';

import ifpeRecifeLogo from '../assets/ifpe_recife.webp';
import ifosLogo from '../assets/ifos.svg';

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function onSubmit(data) {
    if (isLoading) return;
    setIsLoading(true);

    try {
      toast.dismiss();
      await toast.promise(
        api.post('/oauth/login', {
          email: data.email,
          password: data.password,
        }),
        {
          pending: 'Fazendo login...',
          success: 'Login realizado com sucesso!',
        }
      );

      return navigate('/');
    } catch (error) {
      if (error.response.status === 401) {
        toast.error('E-mail ou senha incorretos');
        setError('root.serverError', { message: 'E-mail ou senha incorretos' });
      } else {
        toast.error('Ocorreu um erro ao fazer login');
      }
    }

    setIsLoading(false);
  }

  useEffect(() => {
    api
      .get('/oauth/verify')
      .then(() => navigate('/'))
      .catch(() => {});
  }, []);

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
          {errors.root?.serverError && (
            <span className="text-red-500 text-sm">
              {errors.root.serverError.message}
            </span>
          )}
          {errors.email && (
            <span className="text-red-500 text-sm">Digite seu e-mail</span>
          )}
          <input
            className={clsx('bg-neutral-200 px-4 py-2 rounded-md', {
              'border-2 border-red-500':
                errors.email || errors.root?.serverError,
            })}
            placeholder="E-mail"
            type="email"
            {...register('email', { required: true })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">Digite sua senha</span>
          )}
          <input
            className={clsx('bg-neutral-200 px-4 py-2 rounded-md', {
              'border-2 border-red-500':
                errors.email || errors.root?.serverError,
            })}
            placeholder="Senha"
            type="password"
            {...register('password', { required: true })}
          />
          <button
            className="bg-primary-800 disabled:cursor-progress hover:brightness-90 transition text-neutral-50 font-bold px-4 py-2 rounded-md"
            disabled={isLoading}
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
      <ToastContainer
        position="top-right"
        theme="colored"
        style={{
          fontWeight: 'bold',
        }}
      />
    </>
  );
}
