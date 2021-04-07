import artistsData from "../Jsons/artists.json";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import songsData from "../Jsons/songs.json";
import albumsData from "../Jsons/albums.json";
import SendToNotFound from "./SendToNotFound";


function Artist(props) {
  const [exists, setExists] = useState(false);
  const [selectedSongs, setSelectedSongs]= useState([])
  const [albums, setAlbums]= useState([])


  useEffect(() => {
    const myArtist = artistsData.find(
      (item) => item.id === Number(props.match.params.id)
    );
    if(myArtist !== undefined) {
      setExists(myArtist);
      console.log(myArtist);
      setSelectedSongs(myArtist.selectedSongs);
      setAlbums(myArtist.albumsList);
      }
  }, []);
  if (exists === false) {
    return (
      <SendToNotFound />
      )
    } else {
      return (
        <div className="artist">
        <img src={`..${exists.cover_img}`} alt={exists.name} style={{ width: "100px" }}></img>
        <div className="title">{exists.name}</div><br/>
        <div>
          <div className="subTitle">Albums</div>
          {albums.map((album) => {
            const myAlbum = albumsData.find((item) => item.albumName === album);
            console.log(myAlbum);
            return (
              <Link
                to={{
                  pathname: `/album/${myAlbum.id}`,
                  search: `?artist=${exists.id}`
                }}
                >
                <div key={myAlbum.id}>{album}</div>
              </Link>
            );
          })}
        </div>
        <div><br/>
          <div className="subTitle">songs</div>
          {selectedSongs.map((song) => {
            const mySong = songsData.find((item) => item.songName === song);
            console.log(mySong);
            return (
              <Link
                to={{
                  pathname: `/song/${mySong.id}`,
                  search: `?artist=${exists.id}`
                }}
                >
                <div key={mySong.id}>{song}</div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Artist;
