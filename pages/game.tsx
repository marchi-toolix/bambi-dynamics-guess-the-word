import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from '@material-ui/core'
import { motion } from "framer-motion";
import ReactAudioPlayer from "react-audio-player";

import {
  startGame,
  endGame,
  gameState,
  nextLevel,
} from "../lib/slices/gameSlice";
import Timer from '../components/timer'
import Score from '../components/score'
import HealthPoint from '../components/health-point'
import { wordState, setWordsByDifficulty, setCurrentWord, handleGuessChange, checkGuessAsync } from "../lib/slices/wordSlice";
import Snakebar from '../components/snakebar'
import { timerReset } from "../lib/slices/timerSlice";
import {arrayEquals} from '../src/utilities'

const Game = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const [withMissingChars, setWithMissingChars] = useState<Array<string>>()
  const { level, timer, difficulty } = useSelector(gameState);
  const { words, currentWord, guess, } = useSelector(wordState);
  useEffect(() => {
    const gameWord = []
    for (let i = 0; i < currentWord.length; i++) {
      if (i !== 0 && i % 2) {
        gameWord.push('_')
      }
      else {
        gameWord.push(currentWord[i])
      }
    }
    setWithMissingChars(gameWord)
  }, [currentWord])
  useEffect(() => {
    if (router.isReady && !words.length) router.push('intro')
    dispatch(startGame());
    dispatch(setWordsByDifficulty(difficulty));
    dispatch(setCurrentWord(level));
  }, [])
  useEffect(() => {
    if (timer <= 0) {
      dispatch(endGame());
      dispatch(timerReset())
      router.push('game-over')
    }
  }, [timer]);
  const handleCheck = async () => {
    if (guess !== null) {
      if (!arrayEquals([...guess], currentWord)) {
        await dispatch(checkGuessAsync(false))
        setTimeout(() => {
          dispatch(nextLevel({
            guess: guess,
            currectWord: currentWord.toString(),
            currect: false,
          }))
        }, 900)
      }
      else {
        await dispatch(checkGuessAsync(true))
        setTimeout(() => {
          dispatch(nextLevel({
            guess: guess,
            currectWord: currentWord.toString(),
            currect: true,
          }))
        }, 900)
      }
    
    }
  }
  useEffect(() => {
    dispatch(setCurrentWord(level))
  }, [level])
  return (
    <motion.div>
      <Snakebar />
      <ReactAudioPlayer
          loop={true}
          src="/audio/theme.ogg"
          autoPlay={true}
          onPause={(e) => {
            console.log(e);
          }}
          onCanPlay={(e) => {
            console.log({ e });
          }}
        />
      <div className="wrapper">
        <div className="top">
          <div className="timer">
            <h3>Time Left:</h3>
            <Timer />
          </div>
          <div className="health">
            <HealthPoint />
          </div>
          <div className="scorePoints">
            <Score />
          </div>
        </div>
        <div className="game">
          <h1>Guess the Word :</h1>
          <h2>{withMissingChars}</h2>
          <br />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCheck();
            }}
          >
            <TextField
              autoFocus
              value={guess}
              placeholder={withMissingChars?.join("")}
              inputProps={{ maxLength: withMissingChars?.length }}
              onChange={(e) => {
                let inputValue = e.target.value;
                dispatch(handleGuessChange(inputValue));
              }}
            />
            <br />
            <br />
            <Button type="submit" color="secondary" variant="contained">
              <h3>CHECK</h3>
            </Button>
          </form>
        </div>
      </div>
      <style jsx>{`
        h1,
        h2 {
          font-family: "Chucklesome";
        }
        h1 {
          margin: 40px;
          padding: 20px;
          font-size: 3rem;
          color: #ff5722;
          text-shadow: -2.5px 0 white, 0 2.5px white, 2.5px 0 white,
            0 -2.5px white;
        }
        h2 {
          margin: 0;
          padding: 0;
          font-size: 4rem;
          color: #fff;
          text-shadow: -2.5px 0 black, 0 2.5px black, 2.5px 0 black,
            0 -2.5px black;
        }
        h3 {
          margin: 0;
          padding: 0;
          font-size: 22px;
          font-family: "GameOver";
          color: red;
          text-shadow: -2px 0 white, 0 2px white, 2px 0 white, 0 -2px white;
          border-radius: 40px;
        }
        .wrapper {
          display: flex;
          flex-direction: column;
          place-items: center;
          text-align: center;
          width: 100%;
          height: 100vh;
        }
        .top {
          background: #f55f4e;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          place-items: center;
          padding: 5px 10px;
          width: 100%;
        }
        .game {
          display: flex;
          flex-direction: column;
          place-items: center;
          background: #bc2b25;
          height: 100%;
          width: 100%;
          margin: auto 0;
        }
        .timer {
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .health {
        }
        .scorePoints {
        }
        form {
          display: flex;
          flex-direction: column;
          place-items: center;
          justify-content: space-between;
        }
        @media screen and (max-width: 600px) {
          h1 {
            font-size: 2rem;
          }
          h2 {
            font-size: 3rem;
          }
        }
      `}</style>
    </motion.div>
  );
}

export default Game
