import axios from "axios";

async function fetchTracks() {
  try {
    const response = await fetch("http://localhost:5000/tracks");
    const tracks = await response.json();
    return tracks;
  } catch (error) {
    console.error("Error fetching tracks:", error);
  }
}


