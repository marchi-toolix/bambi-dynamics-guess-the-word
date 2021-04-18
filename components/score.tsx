import { scoreState } from "../lib/slices/scoreSlice";
import { useSelector } from "react-redux";

const Score = () => {
  const { score } = useSelector(scoreState);

  return (
    <div>
      <h3>score: {`${score}`}</h3>
      <style jsx>{`
        h3 {
          margin: 0;
          padding: 0;
          font-size: 2rem;
          color: white;
          font-family: "BoomComic";
          text-shadow: -2px 0 black, 0 2px black, 2px 0 black,
            0 -2px black;
        }
      `}</style>
    </div>
  );
};

export default Score;
