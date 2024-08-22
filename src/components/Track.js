// import { useState, useEffect } from "react";
import { useTrackContext } from "./tracks-context";
import { useEffect } from "react";

const Track = () => {
  const { currentTrack } = useTrackContext();

  // const [backgroundImage, setBackgroundImage] = useState("url(../../public/assets/jazzma.gif)"); 

  // useEffect(() => {
  //   const coverUrl = `url(${process.env.PUBLIC_URL}/${currentTrack.cover})`;
  //   console.log(`cover: ${coverUrl}`);
  //   setBackgroundImage(coverUrl);
  // }, [currentTrack]);

  useEffect(() => {
    if (currentTrack && currentTrack.color) {
      
      document.documentElement.style.setProperty('--main-color', currentTrack.color[0] || 'rgb(255, 255, 255)');
      document.documentElement.style.setProperty('--el-bg-color', currentTrack.color[1] || 'rgb(4, 161, 155)');
    }
    const mainColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim();
    console.log(`current color: ${currentTrack.color}`);
    console.log(`main-color: ${mainColor}`);
  }, [currentTrack]);

  console.log("Current Track:", currentTrack.name); // Debugging line

  return (
    <div className="track-container">
      
      <div className="track-data">
        <h2>{currentTrack ? currentTrack.name : "Track Name"}</h2>
        <img className="cover-img" src={currentTrack.cover} alt="cover" />
        <h3>{currentTrack ? currentTrack.artist : "Artist Name"}</h3>
        <h3>{currentTrack ? currentTrack.album : "Album Name"}</h3>
      </div>
    </div>
  );
};

export default Track;
