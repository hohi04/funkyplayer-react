
import Player from "./components/Player";
import Track from "./components/Track";
import Nav from "./components/Nav";
import { TrackProvider, useTrackContext } from "./components/tracks-context";
import "./styles/app.scss";
import { useEffect } from "react";

function App() {

  const { currentTrack } = useTrackContext();
  
  return (
    <TrackProvider>
      <div>
        <Nav />
        <div className="player-app">
          <Track key={currentTrack.id}/>
          <Player />
        </div>
      </div>
    </TrackProvider>
  );
}

export default App;
