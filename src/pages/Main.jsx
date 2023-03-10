import { useState } from 'react';

import { Header } from '../components/Header';
import { MealSession } from '../components/MealSession';

export function Main() {
  const [sessions, setSessions] = useState([]);

  function createSession() {
    setSessions((oldSessions) => [...oldSessions, <MealSession key={null} />]);
  }

  return (
    <>
      <Header />
      <div className="text-left ml-20 mr-20">
        <h1 className="text-5xl font-bold pt-6 pb-6">Bem vindo!</h1>

        {sessions.map((session) => session)}

        <button
          className="text-2xl rounded-lg bg-lime-600 p-5 pl-10 pr-10 font-bold text-white"
          onClick={createSession}
        >
          Iniciar uma sessão
        </button>
      </div>
    </>
  );
}
