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
      <div>
        <div>{exists.name}</div>
        <ol>
          <h2>Albums</h2>
          {albums.map((album, i) => {
            const myAlbum = albumsData.find((item) => item.albumName === album);
            console.log(myAlbum);
            return (
              <Link
                to={{
                  pathname: `/album/${myAlbum.id}`,
                  search: `?artist=${exists.id}`
                }}
                >
                <li key={i}>{album}</li>
              </Link>
            );
          })}
        </ol>
        <ol>
          <h2>songs</h2>
          {selectedSongs.map((song, i) => {
            const mySong = songsData.find((item) => item.songName === song);
            console.log(mySong);
            return (
              <Link
                to={{
                  pathname: `/song/${mySong.id}`,
                  search: `?artist=${exists.id}`
                }}
                >
                <li key={i}>{song}</li>
              </Link>
            );
          })}
        </ol>
        <img src={`..${exists.cover_img}`} alt={exists.name} style={{ width: "100px" }}></img>
      </div>
    );
  }
}

export default Artist;
