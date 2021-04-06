import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import SendToNotFound from "./SendToNotFound";


import playlistData from "../Jsons/playlist.json";
import songsData from "../Jsons/songs.json"

function Playlist(props) {
  const [exists, setExists] = useState(false);
  const [songsList, setSongList] = useState([]);

  useEffect(()=> {
    const myPlaylist = playlistData.find((item)=> item.id === Number(props.match.params.id));
    if(myPlaylist !== undefined) {
      setExists(myPlaylist);
      console.log(myPlaylist)
      setSongList(myPlaylist.songsList)
    }
  },[]);
  
  if (exists === false) {
    return (
      <SendToNotFound />
    )
  } else {
    return (
      <div>
      <div>{exists.name}</div>
      <div>{exists.created_at}</div>
      {console.log(songsList)}
      <ol>
          <h2>songs</h2>
          {songsList.map((song) => {
            const mySong = songsData.find((item) => item.songName === song);
            console.log(mySong);
            return (
              <Link
                to={{
                  pathname: `/song/${mySong.id}`,
                  search: `?playlist=${exists.id}`
                }}
                >
                <li key={mySong.id}>{song}</li>
              </Link>
            );
          })}
        </ol>
      <img src={`..${exists.cover_img}`} alt={exists.albumName} style={{ width: "100px" }}></img>
      </div>
    );
  }
}

export default Playlist;