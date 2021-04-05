import {Link} from "react-router-dom";
import NotFound from "./NotFound"
import { useEffect, useState } from "react";
import albumsData from "../Jsons/albums.json";
import songsData from "../Jsons/songs.json"

function Album(props) {
  const [exists, setExists] = useState(true);
  const [songsList, setSongList] = useState([]);

  useEffect(()=> {
    const myAlbum = albumsData.find((item)=> item.id === Number(props.match.params.id));
    setExists(myAlbum);
    console.log(myAlbum)
    setSongList(myAlbum.songsList)
  },[]);
  
  return (
    <div>
     <div>{exists.albumName}</div>
     <div>{exists.artistName}</div>
     <ol>
        <h2>songs</h2>
        {songsList.map((song, i) => {
          const mySong = songsData.find((item) => item.songName === song);
          console.log(mySong);
          return (
            <Link to={`/song/${mySong.id}?album=${exists.id}`}>
              <li key={i}>{song}</li>
            </Link>
          );
        })}
      </ol>

     <img src={`..${exists.cover_img}`} alt={exists.albumName} style={{ width: "100px" }}></img>
    </div>
  );
}

export default Album;