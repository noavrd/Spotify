import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import albumsData from "../Jsons/albums.json";
import songsData from "../Jsons/songs.json";
import SendToNotFound from "./SendToNotFound";


function Album(props) {
  const [exists, setExists] = useState(false);
  const [songsList, setSongList] = useState([]);

  useEffect(()=> {
    const myAlbum = albumsData.find((item)=> item.id === Number(props.match.params.id));
    if(myAlbum !== undefined) {
      setExists(myAlbum);
      console.log(myAlbum)
      setSongList(myAlbum.songsList)
    }
  },[]);
  if (exists === false) {
    return (
      <SendToNotFound />
    )
  } else {
    return (
      <div>
      <div>{exists.albumName}</div>
      <div>{exists.artistName}</div>
      <ol>
          <h2>songs</h2>
          {songsList.map((song) => {
            const mySong = songsData.find((item) => item.songName === song);
            console.log(mySong);
            return (
              <Link
                to={{
                  pathname: `/song/${mySong.id}`,
                  search: `?album=${exists.id}`
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

export default Album;