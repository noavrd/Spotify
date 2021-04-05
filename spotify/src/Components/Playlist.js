import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

import playlistData from "../Jsons/playlist.json";
import songsData from "../Jsons/songs.json"

function Playlist(props) {
  const [exists, setExists] = useState(true);
  const [songsList, setSongList] = useState([]);

  useEffect(()=> {
    const myPlaylist = playlistData.find((item)=> item.id === Number(props.match.params.id));
    setExists(myPlaylist);
    console.log(myPlaylist)
    setSongList(myPlaylist.songsList)
  },[]);
  return (
    <div>
     <div>{exists.name}</div>
     <div>{exists.created_at}</div>
     {console.log(songsList)}
     <ol>
        <h2>songs</h2>
        {songsList.map((song, i) => {
          const mySong = songsData.find((item) => item.songName === song);
          console.log(mySong);
          return (
            <Link to={`/song/${mySong.id}?playlist=${exists.id}`}>
              <li key={i}>{song}</li>
            </Link>
          );
        })}
      </ol>
     <img src={`..${exists.cover_img}`} alt={exists.albumName} style={{ width: "100px" }}></img>
    </div>
  );
}

export default Playlist;