import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import jwtDecode from 'jwt-decode';

import 'react-toastify/dist/ReactToastify.min.css';

import { useAuth } from '../hooks/useAuth';

import { Header } from '../components/Header';
import { Input } from '../components/Input';

import { api } from '../services/api';

import ifpeRecifeLogo from '../assets/ifpe_recife.webp';
import ifosLogo from '../assets/ifos.svg';

export function Login() {
  const auth = useAuth();

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
      const response = await toast.promise(
        api.post('/oauth/login', {
          email: data.email,
          password: data.password,
        }),
        {
          pending: 'Fazendo login...',
          success: 'Login realizado com sucesso!',
        }
      );

      const { role } = jwtDecode(response.data.access_token);
      auth.setRole(role);

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
          className="flex flex-col gap-10 mt-12 text-neutral-900"
          onSubmit={handleSubmit(onSubmit)}
        >
          {errors.root?.serverError && (
            <span className="text-red-500 text-sm">
              {errors.root.serverError.message}
            </span>
          )}

          <div className="flex flex-col gap-2">
            <Input
              label="E-mail"
              inputStyle={
                errors.email || errors.root?.serverError
                  ? 'border-2 border-red-500 focus:border-b-red-500'
                  : ''
              }
              labelStyle={
                errors.email || errors.root?.serverError
                  ? 'peer-focus:text-red-500'
                  : ''
              }
              errorMessage={errors.email && 'Digite seu e-mail'}
              {...register('email', { required: true })}
            />

            <Input
              label="Senha"
              type="password"
              inputStyle={
                errors.password || errors.root?.serverError
                  ? 'border-2 border-red-500 focus:border-b-red-500'
                  : ''
              }
              labelStyle={
                errors.password || errors.root?.serverError
                  ? 'peer-focus:text-red-500'
                  : ''
              }
              errorMessage={errors.password && 'Digite sua senha'}
              {...register('password', { required: true })}
            />
          </div>

          <button
            className="bg-primary-800 disabled:cursor-progress hover:brightness-90 transition text-neutral-50 text-lg font-bold px-4 py-3 rounded-md"
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
