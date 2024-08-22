import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { useTrackContext } from "./tracks-context";
import initialTracks from '../data';

// Fisher-Yates (aka Knuth) Shuffle Algorithm
const shuffleArray = (array) => {
  let newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Playlist = ({ playlistStatus }) => {
  const { selectTrack, currentTrack } = useTrackContext();
  const [tracks, setTracks] = useState(initialTracks);

  const handleTrackSelect = useCallback((id) => {
    selectTrack(id);
  }, [selectTrack]);

  const isCurrentTrack = (trackId) => {
    return currentTrack && trackId === currentTrack.id;
  };

  const handleShuffle = () => {
    setTracks(shuffleArray(tracks));
  };

  return (
    <div className={`playlist ${playlistStatus ? "active" : ""}`}>
      <div className="playlist-header">
        <h2>Playlist</h2>
        <FontAwesomeIcon className="shuffle-button" icon={faShuffle} onClick={handleShuffle}/>
      </div>
      <div className="playlist-tracks">
        {tracks && tracks.length > 0 ? (
          tracks.map((track) => (
            <div
              onClick={() => handleTrackSelect(track.id)}
              className={`playlist-track ${isCurrentTrack(track.id) ? "selected" : ""}`}
              key={track.id}
            >
              <img src={track.cover} alt={track.name || "Cover art"} />
              <div className="track-description">
                <h3>{track.name || "Unknown Title"}</h3>
                <h4>{track.artist || "Unknown Artist"}</h4>
              </div>
            </div>
          ))
        ) : (
          <p>No tracks available</p>
        )}
      </div>
    </div>
  );
};

export default Playlist;
