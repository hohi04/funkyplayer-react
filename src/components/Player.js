import React, { useEffect, useRef } from "react";
import VolumeControl from "./VolumeControl";
import TimeControl from "./TimeControl";
import PlayControl from "./PlayControl";
import { useTrackContext } from "./tracks-context";

const Player = () => {
  const audioRef = useRef(null); // Reference to the audio element
  const { currentTrack, getNextTrack } = useTrackContext(); // Get currentTrack from context

  useEffect(() => {
    const handleTrackEnd = () => {
      getNextTrack(currentTrack.id);
        if (audioRef.current) {
          audioRef.current.play();
        }
      };
    
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleTrackEnd);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleTrackEnd);
      }
    };
  }, [currentTrack, getNextTrack]);

  return (
    <div className="player">
      <VolumeControl audioRef={audioRef} />
      <TimeControl audioRef={audioRef} />
      <PlayControl audioRef={audioRef} />
      <audio ref={audioRef} src={currentTrack?.audio} />
    </div>
  );
};

export default Player;
