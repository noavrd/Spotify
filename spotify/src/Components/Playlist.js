import { useEffect, useState } from "react";
import playlistData from "../Jsons/playlist.json";

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
     <ol> songs:
        {songsList.map((song, i)=>{
        return <li key={i}>{song}</li>
        })}
     </ol>
     <img src={`..${exists.cover_img}`} alt={exists.albumName} style={{ width: "100px" }}></img>
    </div>
  );
}

export default Playlist;