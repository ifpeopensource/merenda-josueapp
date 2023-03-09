import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FiLoader } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { Scanner } from '../components/Scanner';
import { StudentMealSessionModal } from '../components/StudentMealSessionModal';

import { api } from '../services/api';

import { getElapsedTime } from '../utils/getElapsedTime';

export function MealSessionPage() {
  const { id } = useParams();
  const [mealSession, setMealSession] = useState({});
  const [elapsedTime, setElapsedTime] = useState({});
  const [isScanPaused, setScanPaused] = useState(false);

  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    message: '',
    description: '',
    studentData: null,
  });

  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    studentData: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    function sessionNotAvailable() {
      toast.dismiss();
      toast.error(
        'Esta sessão já foi encerrada. Voltando para tela inicial...'
      );
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }

    function couldNotLoadSession() {
      toast.dismiss();
      toast.error(
        'Não foi possível carregar a sessão de merenda. Voltando para tela inicial...'
      );
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }

    api
      .get(`/meal-sessions/${id}`)
      .then((response) => {
        if (response.data.finishedAt) {
          sessionNotAvailable();
        } else {
          setMealSession(response.data);
          setInterval(() => {
            setElapsedTime(getElapsedTime(response.data.startedAt));
          }, 1000);
        }
      })
      .catch(couldNotLoadSession);
  }, []);

  async function onQrCodeResult(result) {
    console.log(result, isScanPaused);
    if (isScanPaused) return;
    setScanPaused(true);
    try {
      const response = await api.post(`/meal-sessions/${id}/student/add`, {
        studentId: result,
      });
      const studentData = {
        name: response.data.student.name,
        studentId: response.data.studentId,
        email: response.data.student.email,
        pictureUrl: response.data.student.picUrl,
      };

      setSuccessModal({
        isOpen: true,
        studentData,
      });
    } catch (error) {
      if (error.response.status === 400) {
        if (
          error.response.data.error.details ===
          'student_already_in_meal_session'
        ) {
          setErrorModal({
            isOpen: true,
            message: 'Este estudante já consumiu a merenda nesta sessão',
            description: result,
            studentData: null,
          });
          return;
        }
        setErrorModal({
          isOpen: true,
          message: 'Matrícula Inválida',
          description: result,
          studentData: null,
        });
      } else if (error.response.status === 404) {
        setErrorModal({
          isOpen: true,
          message: 'Estudante não encontrado com a matrícula',
          description: result,
          studentData: null,
        });
      } else {
        setErrorModal({
          isOpen: true,
          message: 'Houve um erro ao adicionar o estudante à sessão',
          description: result,
          studentData: null,
        });
      }
    }
  }

  function onSessionEnd() {
    toast.info('Encerrando sessão...');

    function sessionEnded() {
      toast.dismiss();
      toast.success('Sessão encerrada com sucesso');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }

    function couldNotEndSession() {
      toast.dismiss();
      toast.error('Não foi possível encerrar a sessão atual');
    }

    api
      .patch(`/meal-sessions/${id}`)
      .then(sessionEnded)
      .catch(couldNotEndSession);
  }

  return (
    <>
      <Helmet>
        <title>Sessão de Merenda | JosueApp</title>
      </Helmet>
      {mealSession.startedAt && (
        <Scanner
          onQrCodeResult={onQrCodeResult}
          onSessionEnd={onSessionEnd}
          elapsedTime={elapsedTime}
        />
      )}
      <div className="absolute h-full w-full -z-20 flex flex-col gap-5 items-center justify-center bg-neutral-700">
        <FiLoader
          className="text-neutral-50 motion-safe:animate-spin"
          size={24}
        />
      </div>
      <ToastContainer
        position="top-right"
        theme="colored"
        style={{
          fontWeight: 'bold',
        }}
      />
      <StudentMealSessionModal.Error
        isOpen={errorModal.isOpen}
        closeModal={() => {
          setErrorModal({
            isOpen: false,
          });
          setScanPaused(false);
        }}
        message={errorModal.message}
        description={errorModal.description}
        studentData={errorModal.studentData}
      />
      <StudentMealSessionModal.Success
        isOpen={successModal.isOpen}
        closeModal={() => {
          setSuccessModal({
            isOpen: false,
          });
          setScanPaused(false);
        }}
        studentData={successModal.studentData}
      />
    </>
  );
}
