import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeHigh,
  faVolumeLow,
  faVolumeOff,
} from "@fortawesome/free-solid-svg-icons";

export default function VolumeControl({ audioRef }) {
  const [volume, setVolume] = useState(50);

  // Function to determine the volume icon
  const volIcon = () => {
    if (volume < 1) {
      return faVolumeOff;
    } else if (volume > 0 && volume <= 49) {
      return faVolumeLow;
    } else {
      return faVolumeHigh;
    }
  };

  // Set the initial volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [audioRef, volume]);

  // Function to handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  // Calculate and update the CSS variable based on volume
  useEffect(() => {
    const percentage = volume; // Volume is already a percentage
    document.documentElement.style.setProperty('--percentage', `${percentage}%`);
  }, [volume]);

  return (
    <div className="volume-slider_container" >
      <FontAwesomeIcon icon={volIcon()} className="volume-button" />
      <input
        className="volume-slider"
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
      />
      <p className="volume">{volume}</p>
    </div>
  );
}
