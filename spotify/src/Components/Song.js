import { useEffect, useState } from "react";
import songsData from "../Jsons/songs.json";
import SendToNotFound from "./SendToNotFound";
import albumsData from "../Jsons/albums.json";
import playlistData from "../Jsons/playlist.json";
import artistData from "../Jsons/artists.json";
import {Link} from "react-router-dom";
import {useLocation} from 'react-router-dom'

function Song(props) {
  const [exists, setExists] = useState(false);
  const [suggestedSongs, setSuggestedSongs] = useState([]);
  const queryParams = useQuery();
  useEffect(()=> {
    const mySong = songsData.find((item)=> item.id === Number(props.match.params.id));
    if(mySong !== undefined) {
      setExists(mySong);
      if(props.location.search !== "") {
        const myAlbum = albumsData.find((item)=> item.id === Number(queryParams.album));
        const myPlaylist = playlistData.find((item)=> item.id === Number(queryParams.playlist));
        const myArtist = artistData.find((item)=> item.id === Number(queryParams.artist));
        
        //match suggested songs by album/artist/playlist
        if( queryParams.album) {
          setSuggestedSongs(myAlbum.songsList)
        } else if (queryParams.artist) {
          setSuggestedSongs(myArtist.selectedSongs)
        } else {
          setSuggestedSongs(myPlaylist.songsList)
        }
      }
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
        <div className="suggested">
          <ol>
          <h2>suggestedSongs</h2>

          
          {suggestedSongs.map((song, i) => {
            const otherSong = songsData.find((item) => item.songName === song);
            return (
              /////////////////////////
              //problem - switch url but not the page himself without refresh
              //the problem is with the key
              <Link
              to={{
                pathname: `/song/${otherSong.id}`,
              }}
              >
                <li key={otherSong.id}>{song}</li>
              </Link>
            );
          })}
        </ol>
        </div>
      </div>
    );
    
  }
}

function useQuery() {
  const queryParams = new URLSearchParams(useLocation().search);
  const artist = queryParams.get("artist");
  const album = queryParams.get("album");
  const playlist = queryParams.get("playlist");
  return {artist, album, playlist};
}
export default Song;