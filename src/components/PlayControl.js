import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { useTrackContext } from "./tracks-context";

export default function PlayControl({ audioRef }) {
  const { currentTrack, markAsPlayed, getNextTrack, getPreviousTrack } =
    useTrackContext();

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onplaying = () => setIsPlaying(true);
      audioRef.current.onpause = () => setIsPlaying(false);
    }
  }, [audioRef]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack.audio;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack, isPlaying, audioRef]);

  const handlePlayNext = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    getNextTrack(currentTrack.id);
    markAsPlayed(currentTrack.id);
  };

  const handlePlayPrevious = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    getPreviousTrack(currentTrack.id);
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="play-control">
      <FontAwesomeIcon
        icon={faAngleLeft}
        size="2x"
        className="skip-back"
        onClick={handlePlayPrevious}
      />
      <FontAwesomeIcon
        icon={isPlaying ? faPause : faPlay}
        size="2x"
        className="play"
        onClick={handlePlayPause}
      />
      <FontAwesomeIcon
        icon={faAngleRight}
        size="2x"
        className="skip-forward"
        onClick={handlePlayNext}
      />
    </div>
  );
}
