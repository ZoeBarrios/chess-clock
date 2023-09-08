export default function usePlayersTimes() {
  const changePlayersTimes = (times, player) => {
    let newTimes;
    const lastPLayer = player === 1 ? 2 : 1;
    const playerName = `timePlayer${lastPLayer}`;
    const playerTime = times[`timePlayer${lastPLayer}`];

    if (playerTime + times.timeIncrement > times.time && times.mode === 3) {
      newTimes = {
        ...times,
        [playerName]: times.time,
      };
    } else {
      newTimes = {
        ...times,
        [playerName]: playerTime + times.timeIncrement,
      };
    }

    return newTimes;
  };

  return {
    changePlayersTimes,
  };
}
