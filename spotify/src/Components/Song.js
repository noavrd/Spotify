import { useEffect, useState } from "react";
import songsData from "../Jsons/songs.json";
import SendToNotFound from "./SendToNotFound";


function Song(props) {
  const [exists, setExists] = useState(false);

  useEffect(()=> {
    const mySong = songsData.find((item)=> item.id === Number(props.match.params.id));
    if(mySong !== undefined) {
      setExists(mySong);
      console.log(mySong)
    }
  },[]);

  if(exists === false) {
    return (
      <SendToNotFound />
    )
  } else {
    return (
      <div className="song">
        <div className="songInfo">
          <div className="title">{exists.artistName}</div>
          <div className="together songName">{exists.songName} - </div>
          <div className="together">  {exists.length}</div><br/>
          <iframe  src={exists.src} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <div> views: {exists.views}</div>
        </div>
        <div className="lyrics">
          <div className="title">Lyrics</div><br/>
          <div >{exists.lyrics}</div>
        </div>
      </div>
    );

  }
}

export default Song;