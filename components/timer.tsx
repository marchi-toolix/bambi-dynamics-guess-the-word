import { useEffect, FC } from "react";
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux";
import { timerState, timerReset, tick } from "../lib/slices/timerSlice";
import { gameState, endGame } from "../lib/slices/gameSlice";

import useInterval from "../lib/useInterval";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const Timer: FC = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const { timeCount } = useSelector(timerState);;
  const { level } = useSelector(gameState)
  useInterval(() => {
    dispatch(tick());
  }, 1000);
  useEffect(() => {
    if (timeCount < 1) {
      dispatch(endGame())
      router.push('game-over')
    }
    
  }, [timeCount])
  return (
    <div
      onClick={() => {
        dispatch(timerReset());
      }}
    >
      <CountdownCircleTimer
        key={level}
        isPlaying
        initialRemainingTime={timeCount}
        duration={timeCount}
        size={80}
        colors={[
          ["#ffffc4", 0.33],
          ["#ffff56", 0.33],
          ["#d61a05", 0.33],
        ]}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;
