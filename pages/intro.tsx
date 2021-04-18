import { useEffect } from 'react'
import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux'
import { Button, Select, MenuItem, FormControl } from "@material-ui/core"
import { motion } from "framer-motion";

import { gameState, setDifficulty } from '../lib/slices/gameSlice'
import { fetchWords, wordState } from '../lib/slices/wordSlice'
import { HPReset } from "../lib/slices/HPSlice";
import { timerReset } from "../lib/slices/timerSlice";

function Index() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { difficulty } = useSelector(gameState)
    const { loading, isEmpty } = useSelector(wordState)
    useEffect(() => {
        dispatch(fetchWords())
        dispatch(HPReset())
        dispatch(timerReset())
    }, [])

    return (
      <main>
    
        <div className="card">
          <motion.div
            initial={{ opacity: 0, rotate: 0, scale: 8 }}
            animate={{ opacity: 1, rotate: 720, scale: 1 }}
            transition={{ type: "Tween", stiffness: 90, duration: 1 }}
          >
            <h1>Guess The Word</h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "Tween", stiffness: 90, duration: 1 }}
          >
            <h2>Select difficulty</h2>
            <FormControl style={{ width: "40vh" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={difficulty}
                onChange={(e) => {
                  console.log(e.target.value);
                  dispatch(setDifficulty(e.target.value));
                }}
              >
                <MenuItem value="easy">
                  <h4>Easy</h4>
                </MenuItem>
                <MenuItem value="mid">
                  <h4>Mid</h4>
                </MenuItem>
                <MenuItem value="hard">
                  <h4>Hard</h4>
                </MenuItem>
              </Select>
            </FormControl>
            <h2>and hit</h2>

            <Button
              disabled={loading || isEmpty}
              style={{ width: "40vh", margin: "0 auto" }}
              color="primary"
              variant="contained"
              onClick={() => {
                router.push("game");
              }}
            >
              <h3>{loading || isEmpty ? "LOADING" : "START GAME"}</h3>
            </Button>
          </motion.div>
          <h6>
            This game brought to You by Daniel Marchi as first assigment for
            Bamabi Dynamics.
            <br />
            Build using React.js, Next.js, Redux, Redux-Toolkit, Mateiral-UI,
            NanoSQL
          </h6>
          <br/>
        </div>
        <style jsx>{`
          h1 {
            //    logo
            margin: 30px 0 0;
            padding: 0;
            font-size: 80px;
            font-family: "Chucklesome";
            color: #000;
            text-shadow: -2.5px 0 white, 0 2.5px white, 2.5px 0 white,
              0 -2.5px white;
          }
          h2,h3,h4 {
            //    start button
            margin: 0;
            padding: 0;
            font-size: 40px;
            font-family: "GameOver";
            color: #000;
            text-shadow: -0.5px 0 white, 0 0.5px white, 0.5px 0 white,
              0 -0.5px white;
          }
          h2 {
            //    select difficulty title
            margin: 15px;
            font-family: "BoomComic";
          }
          h4 {
            //    difficulty select item
            margin: 10px;
          }
          h6 {
            //    description footer
            margin: 25px auto 10px;
            padding: 0;
            font-size: 15px;
            font-family: "Helvetica";
          }
          main {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100vh;
              background-size: 400% 400%;
              position: fixed;
              animation: pulse 2.5s infinite;
              text-align: center;
            }
          }
          .card {
            display: flex;
            gap: 40px;
            width: 80%;
            height: 90vh;
            flex-direction: column;
            justify-content: center;
            place-items: center;
            gap: 10px;
            background: linear-gradient(
              180deg,
              rgb(255 255 255 / 10%) 10%,
              rgb(255 255 255 / 10%) 20%,
              rgb(255 255 255 / 10%) 30%,
              rgb(255 255 255 / 10%) 60%,
              rgb(255 255 255 / 10%) 100%
            );
          }
          @media (max-width: 768px) {
            h1 {
              margin: 0;
              font-size: 40px;
            }
            h2, h3, h4, h5 {
              font-size: 30px;
            }
            h6 {
              margin: 10px;
              font-size: 10px;
            }
            br {
              display: none;
            }
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
      </main>
    );
}

export default Index


// import React from "react";
// import { motion } from "framer-motion";
// import { useRouter } from "next/router";
// import dynamic from "next/dynamic";


// import HealthPoint from "../components/health-point";
// import Timer from "../components/timer";
// import Score from "../components/score";

// import Layout from "../components/layout";
// const DynamicComponent = dynamic(() => import("./audio"));

// function index() {
//   const router = useRouter();
//   return (
//     <>
//       <DynamicComponent />
//       <Layout>
//         <motion.div
//           exit={{ opacity: 0 }}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           <Timer />
//           <Score />
//           <div className="container">
//             <h1 className="animate__animated animate__pulse animate__infinite animate__slow">
//               Guess the Word
//             </h1>
//             <div className="wrapper animate__animated animate__heartBeat">
//               <div className="animate__animated animate__heartBeat animate__infinite">
//                 <HealthPoint />
//               </div>
//               <div className="wordWrapper">
//                 <h1 className="animate__animated ">
//                   made by
//                   <br />
//                   Dani Marchi
//                 </h1>
//               </div>
//               <div className="answerWrapper">
//                 <h5>
//                   as First assignment
//                   <br />
//                   for
//                 </h5>

//                 <h2 className="animate__animated animate__wobble">
//                   bambi Dynamic
//                 </h2>
//               </div>
//               <div className="submitWrapper">
//                 <button
//                   onClick={() => {
//                     router.push("game");
//                   }}
//                 >
//                   Start Game
//                 </button>
//               </div>
//             </div>
//           </div>
//           <style jsx>{`
//             h1 {
//               margin: 0;
//               padding: 0;
//               text-align: center;
//               color: #fff;
//             }
//             h2 {
//               margin: 0;
//               padding: 0;
//               text-align: center;
//               font-weight: bold;
//               color: #fff;
//             }
//             h5 {
//               margin: 0;
//               padding: 0;
//               color: #fff;
//             }
//             .container {
//               padding: 20px;
//               margin: 0 auto;
//               border-radius: 16px;
//               background-color: #000000b3;
//             }
//             .wrapper {
//               display: grid;
//               grid-template-rows: 0.5fr 2fr;
//               gap: 6px;
//               text-align: center;
//               justify-content: center;
//               place-items: center;
//             }
//             .wordWrapper {
//               display: flex;
//               align-items: center;
//               text-align: center;
//               margin-top: 15px;
//             }
//             .answerWrapper {
//               margin: 0;
//               padding: 0;
//             }
//             .submitWrapper {
//               display: flex;
//               align-items: center;
//               text-align: center;
//               margin-top: 15px;
//             }
//           `}</style>
//         </motion.div>
//       </Layout>
//     </>
//   );
// }

// export default index;
