export function getElapsedTime(startTime) {
  if (!startTime) return '';
  const diffTime = Math.abs(new Date() - new Date(startTime));
  const elapsedTimeInSeconds = Math.ceil(diffTime / 1000); // seconds

  return {
    hours: Math.floor(elapsedTimeInSeconds / (60 * 60)), // (60 seconds * 60 minutes) = 3600 seconds in an hour
    minutes: Math.floor((elapsedTimeInSeconds % (60 * 60)) / 60), // Get the remainder of the hours and then divide by 60 to get the minutes
    seconds: Math.floor((elapsedTimeInSeconds % (60 * 60)) % 60), // Get the remainder of the hours and then divide by 60 to get the minutes, then get the remainder of that to get the seconds
  };
}
