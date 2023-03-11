import PropTypes from 'prop-types';

export function MealSessionItem({ id, startTime, onEnd }) {
  function formatTime(date) {
    const daysAgo = Math.floor((new Date() - date) / 1000 / 60 / 60 / 24); // 1000ms * 60s * 60m * 24h = 1 day

    let daysAgoText = '';
    if (daysAgo === 1) {
      daysAgoText = 'ontem';
    } else if (daysAgo > 1) {
      daysAgoText = `há ${daysAgo} dias`;
    }

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return {
      time: `${hours}:${minutes}`,
      daysAgo: daysAgoText,
    };
  }

  const { time, daysAgo } = formatTime(startTime);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
      <div>
        <p className="text-2xl font-medium">Sessão de Merenda</p>
        <p className="text-lg">
          iniciada <span className="font-bold">{daysAgo}</span> às{' '}
          <span className="font-bold">{time}</span>
        </p>
      </div>

      <div className="flex gap-8 justify-between items-center">
        <button
          type="button"
          className="bg-red-500 text-neutral-50 hover:brightness-90 active:brightness-90 transition shadow-sm w-fit rounded-lg px-8 py-2 font-bold"
          onClick={onEnd}
        >
          Encerrar
        </button>
        <a
          className="bg-primary-800 text-neutral-50 hover:brightness-90 active:brightness-90 transition shadow-sm w-fit rounded-lg px-8 py-2 font-bold"
          href={`/meal-session/${id}`}
        >
          Entrar
        </a>
      </div>
    </div>
  );
}

MealSessionItem.propTypes = {
  id: PropTypes.string.isRequired,
  startTime: PropTypes.instanceOf(Date).isRequired,
  onEnd: PropTypes.func.isRequired,
};
