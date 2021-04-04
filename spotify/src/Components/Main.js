import { React, useEffect, useState } from "react";
// import Album from "./Album";
// import Artist from "./Artist";
// import Playlist from "./Playlist";
import ShowSong from "./ShowSong";
import albumsData from "../Jsons/albums.json";
import songsData from "../Jsons/songs.json";
import playlistsData from "../Jsons/playlist.json";
import artistsData from "../Jsons/artists.json";

function Main() {
  const [topSongs, setTopSongs] = useState([]);
  useEffect(() => {
    setTopSongs(songsData.sort((a,b) => ( b.views- a.views )).slice(0, 5))
  },[])

  return (
    <div>
     <h1>Main</h1>
     <h3>Top 5 songs</h3>
     <ul>
       <ShowSong songs={topSongs}/>
     </ul>
     <h3>Top 5 playlists</h3>
     <ul>
       {/* <Playlist/> */}
     </ul>
     <h3>Top 5 albums</h3>
     <ul>
       {/* <Album /> */}
     </ul>
     <h3>Top 5 artists</h3>
     <ul>
       {/* <Artist /> */}
     </ul>
    </div>
  );
}

export default Main;