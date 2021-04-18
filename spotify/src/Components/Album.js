import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import albumsData from "../Jsons/albums.json";
import songsData from "../Jsons/songs.json";
import SendToNotFound from "./SendToNotFound";
import axios from "axios"
import GetById from "./GetRequests"

function Album(props) {
  const [exists, setExists] = useState(false);
  const [songsList, setSongList] = useState([]);
  const [myAlbum, setMyAlbum] = useState();

  useEffect(()=> {
    // const myAlbum = albumsData.find((item)=> item.id === Number(props.match.params.id));
    // const myAlbum = <GetById id={props.match.params.id}
    // type={"album"}/>

    axios.get(`http://localhost:3000/album/${props.match.params.id}`)
    .then((response) => {
        console.log(response);
        // setMyAlbum(response.data) ;
        setExists(response.data);
      console.log(exists)
      setSongList(myAlbum.songsList)
    })
    .catch((err) => {
        return err;
    })
    console.log(myAlbum)
    // if(myAlbum !== undefined) {
    //   setExists(myAlbum);
    //   console.log(myAlbum)
    //   setSongList(myAlbum.songsList)
    // }
  },[]);
  if (exists === false) {
    return (
      <SendToNotFound />
    )
  } else {
    return (
      <div className="album">
      <img src={`..${exists.cover_img}`} className="albumPicture" alt={exists.albumName} style={{ width: "100px" }}></img>
      <div className="title">{exists.artistName}</div>
      <div className="subTitle">{exists.albumName}</div><br/>
      <div>
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
                <div key={mySong.id} className="albumList">{song}</div>
              </Link>
            );
          })}
        </div>

      </div>
    );
  }
}

export default Album;