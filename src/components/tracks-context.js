import React, { createContext, useContext, useState, useEffect } from "react";
import Songbank from "../data";

// Create a context
const TrackContext = createContext({
  playedTracks: [],
  currentTrack: {},
  selectTrack: () => {},
  markAsPlayed: () => {},
  getNextTrack: () => {},
  getPreviousTrack: () => {},
  currentColor: ["#000", "#FFF"],
});

// Create a provider component
export const TrackProvider = ({ children }) => {
  const [tracklist] = useState(Songbank);
  const [playedTracks, setPlayedTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(tracklist[0]);
  const [currentColor, setCurrentColor] = useState(["#000", "#FFF"]);

  const selectTrack = (trackId) => {
    const track = tracklist.find((track) => track.id === trackId);
    setCurrentTrack(track);
  };

  const markAsPlayed = () => {
    if (
      currentTrack &&
      !playedTracks.find((track) => track.id === currentTrack.id)
    ) {
      setPlayedTracks((prev) => [...prev, currentTrack]);
    }
  };

  const getNextTrack = () => {
    if (!currentTrack) return null;
    const currentIndex = tracklist.findIndex(
      (track) => track.id === currentTrack.id
    );
    setCurrentTrack(tracklist[(currentIndex + 1) % tracklist.length]);
  };

  const getPreviousTrack = () => {
    if (!currentTrack || playedTracks.length === 0) return null;
    const currentIndex = playedTracks.findIndex(
      (track) => track.id === currentTrack.id
    );
    setCurrentTrack(
      playedTracks[
        (currentIndex - 1 + playedTracks.length) % playedTracks.length
      ]
    );
  };

  useEffect(() => {
    if (currentTrack && currentTrack.color) {
      setCurrentColor(currentTrack.color);
    }
  }, [currentTrack]);

  return (
    <TrackContext.Provider
      value={{
        playedTracks,
        currentTrack,
        selectTrack,
        markAsPlayed,
        getNextTrack,
        getPreviousTrack,
        currentColor
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};

// Create a custom hook to use the TrackContext
export const useTrackContext = () => {
  return useContext(TrackContext);
};
