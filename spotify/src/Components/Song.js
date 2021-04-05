import { useEffect, useState } from "react";
import songsData from "../Jsons/songs.json";

function Song(props) {
  const [exists, setExists] = useState(true);

  useEffect(()=> {
    const mySong = songsData.find((item)=> item.id === Number(props.match.params.id));
    setExists(mySong);
    console.log(mySong)
  },[]);
  return (
    <div>
       <h1>Song</h1>
     <div> views: {exists.views}</div>
     <div>{exists.artistName}</div>
     <div>{exists.length}</div>
     <div>{exists.songName}</div>
     <div>{exists.lyrics}</div>
     <iframe width="560" height="315" src={exists.src} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  );
}

export default Song;