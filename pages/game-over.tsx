import GameOverForm from '../components/game-over-form'
import { useSelector } from 'react-redux';
import { scoreState } from '../lib/slices/scoreSlice'
import SentSuccess from '../components/sent-success'
import ScoreTable from '../components/score-table'
import { Button } from '@material-ui/core'
import {useRouter} from 'next/router';
import ReactAudioPlayer from "react-audio-player";

const Index = () => {
  const { status } = useSelector(scoreState)
  const router = useRouter()
  return (
    <div className="wrapper">
   <ReactAudioPlayer
          loop={true}
          src="/audio/round.ogg"
          autoPlay={true}
          onPause={(e) => {
            console.log(e);
          }}
        />
      <h1>Game Over</h1>
      {status !==  'success' ? <GameOverForm/> : <SentSuccess/>}
      <br/>
      <Button variant="contained" onClick={()=> {
        router.push('intro')
      }}>Start Over</Button>
      <br/>
      <br/>
      <ScoreTable/>
      <style jsx>{`
      h1 {
        font-family: "GameOver";
          margin: 40px;
          padding: 20px;
          font-size: 5rem;
          color: #ff5722;
          text-shadow: -2.5px 0 white, 0 2.5px white, 2.5px 0 white,
            0 -2.5px white;
        }
    
        .wrapper {
          padding: 10px;
          min-height: 60vh;
          text-align: center;
          background: linear-gradient(
              180deg,
              rgb(255 255 255 / 10%) 10%,
              rgb(255 255 255 / 10%) 20%,
              rgb(255 255 255 / 10%) 30%,
              rgb(255 255 255 / 10%) 60%,
              rgb(255 255 255 / 10%) 100%
            );
            animation: pulse 2.5s infinite;
        }
        @keyframes pulse {
            0% {
              background-color: #bc2b25;
            }
            50% {
              background-color: #FF4100;
            }
            100% {
              background-color: #bc2b25;
            }
          }
      `}</style>
    </div>
  )
}

export default Index
