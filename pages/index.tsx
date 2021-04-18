import { useEffect } from "react";
import { useRouter } from "next/router";

function index() {
  const router = useRouter();
  useEffect(() => {
    router.push('intro')
  }, []);
  return (
    <div className="index-page">
      <div
        onClick={() => {
          router.push("intro");
        }}
      >
        <h1
          style={{
            fontFamily: "BestFriends",
            color: "#ff5722",
            border: "2px solid black",
            textShadow:
              "-2.5px 0 black, 0 2.5px black, 2.5px 0 black, 0 -2.5px black",
            mixBlendMode: "multiply",
          }}
        >
          W E L C O M E
          <br />
          Click here to start
        </h1>
      </div>
    </div>
  );
}

export default index;
