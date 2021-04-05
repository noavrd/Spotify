import { useEffect, useState } from "react";
import albumsData from "../Jsons/albums.json";

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
       <h1>Album</h1>
     <div>{exists.albumName}</div>
     <div>{exists.artistName}</div>
     <ol>
        {songsList.map((song, i)=>{
        return <li key={i}>{song}</li>
        })}
     </ol>
     <img src={`..${exists.cover_img}`} alt={exists.albumName}></img>
    </div>
  );
}

export default Album;