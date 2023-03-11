import { useEffect, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { ConfirmationModal } from '../components/ConfirmationModal';
import { Header } from '../components/Header';
import { MealSessionItem } from '../components/MealSessionItem';

import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';

export function DashboardPage() {
  const navigate = useNavigate();

  const auth = useAuth();
  auth.requireAuth(navigate);

  const [mealSessions, setMealSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOptions, setModalOptions] = useState({
    isOpen: false,
    message: '',
    onNo: () => {},
    onYes: () => {},
  });

  function showModal(message, onYes, onNo) {
    setModalOptions({
      isOpen: true,
      message,
      onYes,
      onNo,
    });
  }

  function hideModal() {
    setModalOptions((prevState) => ({
      isOpen: false,
      message: prevState.message, // Avoid clear message while modal is closing
      onNo: () => {},
      onYes: () => {},
    }));
  }

  async function newMealSession() {
    setIsLoading(true);
    try {
      const response = await api.post('/meal-sessions');

      setMealSessions((prevState) => [response.data, ...prevState]);
    } catch (error) {
      toast.error('Erro ao iniciar uma nova sessão');
    }
    setIsLoading(false);
  }

  async function endMealSession(mealSessionId) {
    setIsLoading(true);
    try {
      await api.patch(`/meal-sessions/${mealSessionId}`);

      setMealSessions((prevState) =>
        prevState.filter((mealSession) => mealSession.id !== mealSessionId)
      );
    } catch (error) {
      toast.error('Erro ao encerrar sessão');
    }
    setIsLoading(false);
  }

  useEffect(() => {
    api
      .get('/meal-sessions')
      .then((response) => {
        setMealSessions(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        toast.dismiss();
        toast.error('Erro ao carregar as sessões de merenda');
      });
  }, []);

  if (!auth.isVerifier()) {
    return (
      <>
        <Header showLogoutButton />
        <div className="flex flex-col gap-2 px-4 my-6">
          <p className="text-lg font-medium text-primary-900">
            Você não possui permissão para gerenciar as sessões de merenda
          </p>
          <p className="text-primary-900">
            Em caso de dúvidas, entre em contato com o administrador do sistema.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header showLogoutButton />
      <div className="flex flex-col gap-11 px-4 my-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <FiLoader className="text-primary-800 animate-spin" size={24} />
              </div>
            ) : mealSessions.length > 0 ? (
              mealSessions.map((mealSession) => (
                <MealSessionItem
                  key={mealSession.id}
                  id={mealSession.id}
                  startTime={new Date(mealSession.startedAt)}
                  onEnd={() => {
                    showModal(
                      'Deseja realmente encerrar esta sessão?',
                      () => {
                        endMealSession(mealSession.id);
                        hideModal();
                      },
                      () => {
                        hideModal();
                      }
                    );
                  }}
                />
              ))
            ) : (
              <p className="text-lg font-medium">
                Não há nenhuma sessão de merenda ativa no momento
              </p>
            )}
          </div>

          <button
            type="button"
            className="bg-primary-800 text-neutral-50 hover:brightness-90 active:brightness-90 transition shadow-sm w-fit rounded-lg px-8 py-2 font-bold"
            onClick={() => {
              if (mealSessions.length > 0) {
                showModal(
                  'Já existe uma sessão em andamento. Deseja realmente iniciar uma nova sessão?',
                  () => {
                    newMealSession();
                    hideModal();
                  },
                  () => {
                    hideModal();
                  }
                );
              } else {
                newMealSession();
              }
            }}
          >
            Nova Sessão
          </button>
        </div>

        {auth.role === 'ADMIN' && (
          <a
            href="/register"
            className="bg-primary-800 text-neutral-50 hover:brightness-90 active:brightness-90 transition shadow-sm w-fit rounded-lg px-8 py-2 font-bold"
          >
            Cadastrar Usuário
          </a>
        )}
      </div>
      <ConfirmationModal
        closeModal={hideModal}
        isOpen={modalOptions.isOpen}
        message={modalOptions.message}
        onNo={modalOptions.onNo}
        onYes={modalOptions.onYes}
      />
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
