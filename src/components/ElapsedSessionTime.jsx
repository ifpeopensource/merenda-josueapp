import PropTypes from 'prop-types';

export function ElapsedTime({ elapsedTime }) {
  return (
    <span className="font-normal">
      {elapsedTime.hours > 0 && String(elapsedTime.hours) + ' horas, '}
      {(elapsedTime.minutes > 0 || elapsedTime.hours > 0) &&
        String(elapsedTime.minutes) + ' minutos e '}
      {(elapsedTime.seconds > 0 ||
        elapsedTime.minutes > 0 ||
        elapsedTime.hours > 0) &&
        String(elapsedTime.seconds) + ' segundos'}
    </span>
  );
}

ElapsedTime.propTypes = {
  elapsedTime: PropTypes.shape({
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
  }).isRequired,
};
