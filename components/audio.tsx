import React from "react";
import ReactAudioPlayer from "react-audio-player";

function audio( ) {
  
  return (
    <div>
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
    </div>
  );
}

export default audio;
