import { useEffect } from 'react';
import Image from "next/image";
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux";
import {  HPState, HPType } from "../lib/slices/HPSlice";
import { endGame } from '../lib/slices/gameSlice'
function HealthPoint() {
  const router = useRouter()
  const dispatch = useDispatch();
  const { HP } = useSelector(HPState);
  const imageByStatus = (item: HPType): string => {
    if (item.status === "active") {
      return `/heart.gif`;
    }
    if (item.status === "exploding") {
      return `/exploding-heart.gif`;
    } else {
      return "";
    }
  };

  useEffect(()=>{
    if (HP.length < 1) {
      dispatch(endGame())
      router.push('game-over')
    }
  },[HP])
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
      {HP &&
        HP.map((item, idx) => (
          <div
            style={{
              position: "relative",
              display: "grid-item",
              width: "10vw",
            }}
            key={idx}
          >
            <Image
              alt="heart"
              src={imageByStatus(item)}
              layout="responsive"
              width={80}
              height={80}
            />
          </div>
        ))}
    </div>
  );
}

export default HealthPoint;
