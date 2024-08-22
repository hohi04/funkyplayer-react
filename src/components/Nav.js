import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import Playlist from "./Playlist";

const avatarImg = "assets/avatar.gif";

const Nav = () => {
  const [playlistStatus, setPlaylistStatus] = useState(false);

  function handlePLStatus() {
    setPlaylistStatus(!playlistStatus);
  }

  return (
    <>
      <header>
        <nav>
          <div className="nav-container">
            <h1>
              <span> The autumn goat undercover </span>
              <FontAwesomeIcon icon={faMusic} />
            </h1>
            <div className="avatar-div">
              <img className="user-avatar" src={avatarImg} alt="avatar" />
            </div>
            <div className="pl-div">
              <button onClick={handlePLStatus}>Playlist</button>
            </div>
          </div>
        </nav>
        {playlistStatus && <Playlist playlistStatus={playlistStatus} />}
      </header>
    </>
  );
};

export default Nav;
