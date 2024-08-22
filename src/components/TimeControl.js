import React, { useState, useEffect } from 'react';
import { useTrackContext } from "./tracks-context";

export default function TimeControl({ audioRef }) {

  const {currentTrack} = useTrackContext();

  const [trackInfo, setTrackInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  useEffect(() => {
    if (audioRef.current) {
      const updateTrackInfo = () => {
        const { currentTime, duration } = audioRef.current;
        const animation = duration > 0 ? Math.round((currentTime / duration) * 100) : 0;
        setTrackInfo({
          currentTime,
          duration,
          animationPercentage: animation,
        });
      };

      audioRef.current.addEventListener('timeupdate', updateTrackInfo);
      return () => {
        audioRef.current.removeEventListener('timeupdate', updateTrackInfo);
      };
    }
  }, [audioRef]);

  // Function to format time
  const getTime = (time) =>
    Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);

  // Function to handle time drag
  const dragHandler = (e) => {
    const newTime = e.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setTrackInfo({ ...trackInfo, currentTime: newTime });
    }
  };

  return (
    <div className="time-control">
      <p>{getTime(trackInfo.currentTime)}</p>
      <div
        className="track"
        style={{
          background: `linear-gradient(to right, ${currentTrack[0]}, ${currentTrack[1]})`, // Update as needed
        }}
      >
        <input
          type="range"
          min={0}
          max={trackInfo.duration || 0}
          value={trackInfo.currentTime}
          onChange={dragHandler}
        />
        <div
          className="animate-track"
          style={{ transform: `translateX(${trackInfo.animationPercentage}%)` }}
        ></div>
      </div>
      <p>{trackInfo.duration ? getTime(trackInfo.duration) : "00:00"}</p>
    </div>
  );
}
