import { useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { Helmet } from 'react-helmet';
import { FiChevronDown } from 'react-icons/fi';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import clsx from 'clsx';

import { Header } from '../components/Header';
import { Input } from '../components/Input';

import { useAuth } from '../hooks/useAuth';

import { api } from '../services/api';

export function RegisterPage() {
  const navigate = useNavigate();

  const auth = useAuth();
  auth.requireAuth(navigate);

  useEffect(() => {
    if (!auth.isAdmin()) {
      navigate('/', { replace: true });
    }
  }, [auth]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data) {
    if (isLoading) return;
    if (data.password !== data.passwordConfirmation) {
      setError('root.password.dontMatch', {
        message: 'As senhas não coincidem',
      });
      return;
    }
    setIsLoading(true);

    try {
      toast.dismiss();
      await toast.promise(
        api.post('/users', {
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        }),
        {
          pending: 'Cadastrando usuário...',
          success: 'Cadastro realizado com sucesso!',
        }
      );
      reset();
      setSelectedRole('');
    } catch (error) {
      if (error.response?.status === 400) {
        const issues = error.response?.data?.error?.details?.issues;
        if (!issues) {
          if (
            error.response?.data?.error?.message ===
            'User already exists in database!'
          ) {
            toast.error('Este e-mail já está cadastrado');
            setIsLoading(false);
            return;
          }
          toast.error('Ocorreu um erro ao cadastrar o usuário');
          setIsLoading(false);
          return;
        }

        if (
          issues.find(
            (issue) =>
              issue.code === 'invalid_string' && issue.path.includes('password')
          )
        ) {
          setError('root.password.weak', {
            message:
              'A senha deve conter entre 8 e 32 caracteres, pelo menos uma letra, um número e um caractere especial',
          });
        }

        if (
          issues.find(
            (issue) =>
              issue.code === 'invalid_string' && issue.path.includes('email')
          )
        ) {
          setError('root.email.invalid', {
            message: 'E-mail inválido',
          });
        }
      } else {
        toast.error('Ocorreu um erro ao cadastrar o usuário');
      }
    }

    setIsLoading(false);
  }

  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <>
      <Helmet>
        <title>Cadastro | JosueApp</title>
      </Helmet>
      <Header showBackButton showLogoutButton />
      <div className="p-4 pt-8 max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-neutral-900">
          Cadastrar Usuário
        </h1>
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
              label="Nome Completo"
              type="text"
              inputStyle={
                errors.name || errors.root?.serverError
                  ? 'border-2 border-red-500 focus:border-b-red-500'
                  : ''
              }
              labelStyle={
                errors.name || errors.root?.serverError
                  ? 'peer-focus:text-red-500'
                  : ''
              }
              errorMessage={errors.name && 'Digite o nome completo'}
              {...register('name', { required: true })}
            />
            <Input
              label="E-mail"
              type="email"
              autocomplete="username"
              inputStyle={
                errors.email ||
                errors.root?.email?.invalid ||
                errors.root?.serverError
                  ? 'border-2 border-red-500 focus:border-b-red-500'
                  : ''
              }
              labelStyle={
                errors.email ||
                errors.root?.email?.invalid ||
                errors.root?.serverError
                  ? 'peer-focus:text-red-500'
                  : ''
              }
              errorMessage={
                (errors.email && 'Digite o E-mail') ||
                errors.root?.email?.invalid?.message
              }
              {...register('email', { required: true })}
            />
            <Input
              label="Senha"
              type="password"
              autocomplete="new-password"
              inputStyle={
                errors.password ||
                errors.root?.password?.dontMatch ||
                errors.root?.password?.weak ||
                errors.root?.serverError
                  ? 'border-2 border-red-500 focus:border-b-red-500'
                  : ''
              }
              labelStyle={
                errors.password ||
                errors.root?.password?.dontMatch ||
                errors.root?.password?.weak ||
                errors.root?.serverError
                  ? 'peer-focus:text-red-500'
                  : ''
              }
              errorMessage={
                (errors.password && 'Digite a senha') ||
                errors.root?.password?.dontMatch?.message ||
                errors.root?.password?.weak?.message
              }
              {...register('password', { required: true })}
            />
            <Input
              label="Confirmar Senha"
              type="password"
              autocomplete="new-password"
              inputStyle={
                errors.passwordConfirmation ||
                errors.root?.password?.dontMatch ||
                errors.root?.password?.weak ||
                errors.root?.serverError
                  ? 'border-2 border-red-500 focus:border-b-red-500'
                  : ''
              }
              labelStyle={
                errors.passwordConfirmation ||
                errors.root?.password?.dontMatch ||
                errors.root?.password?.weak ||
                errors.root?.serverError
                  ? 'peer-focus:text-red-500'
                  : ''
              }
              errorMessage={
                (errors.passwordConfirmation && 'Confirme a senha') ||
                errors.root?.password?.dontMatch?.message
              }
              {...register('passwordConfirmation', { required: true })}
            />

            <Controller
              control={control}
              defaultValue=""
              name="selectedRole"
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Listbox
                  value={selectedRole}
                  onChange={(e) => {
                    onChange(e);
                    setSelectedRole(e);
                  }}
                >
                  <Listbox.Button
                    className={clsx(
                      'relative w-full flex justify-between items-center text-left bg-neutral-200 flex-1 px-4 py-3 rounded-md outline-none focus:border focus:border-primary-800',
                      {
                        'pt-6 text-neutral-900': selectedRole,
                        'text-neutral-500': !selectedRole,
                        'border border-red-500': errors.selectedRole,
                      }
                    )}
                  >
                    {selectedRole
                      ? selectedRole === 'ADMIN'
                        ? 'Administrador'
                        : 'Verificador'
                      : 'Cargo'}

                    {selectedRole && (
                      <span className="absolute top-1 text-xs text-neutral-500">
                        Cargo
                      </span>
                    )}
                    <FiChevronDown className="text-neutral-500" size={24} />
                  </Listbox.Button>
                  <Listbox.Options className="[&>*]:py-2 [&>*]:px-4 [&>*]:cursor-pointer [&>*]:bg-neutral-200 [&>*:hover]:brightness-90 [&>*]:transition bg-neutral-200 flex flex-col rounded-b-lg border-b overflow-hidden">
                    <Listbox.Option value="VERIFIER">
                      Verificador
                    </Listbox.Option>
                    <Listbox.Option value="ADMIN">Administrador</Listbox.Option>
                  </Listbox.Options>
                </Listbox>
              )}
            />
            {errors.selectedRole
              ? errors.selectedRole && (
                  <span className="text-red-500 text-sm">
                    Selecione o cargo do usuário
                  </span>
                )
              : ''}
          </div>

          <button
            className="bg-primary-800 disabled:cursor-progress hover:brightness-90 transition text-neutral-50 text-lg font-bold px-4 py-3 rounded-md"
            disabled={isLoading}
            type="submit"
          >
            Cadastrar
          </button>
        </form>
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
