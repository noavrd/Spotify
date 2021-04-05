import { React, useEffect, useState } from "react";
// import Album from "./Album";
// import Artist from "./Artist";
// import Playlist from "./Playlist";
import albumsData from "../Jsons/albums.json";
import songsData from "../Jsons/songs.json";
import playlistsData from "../Jsons/playlist.json";
import artistsData from "../Jsons/artists.json";

function Main() {
  const [topSongs, setTopSongs] = useState([]);
  const [topAlbums, setTopAlbums] = useState([])
  useEffect(() => {
    setTopSongs(songsData.sort((a,b) => ( b.views- a.views )).slice(0, 5));
    setTopAlbums(albumsData.slice(0,5))
  },[])

  return (
    <div>
     <h1>Main</h1>
     <h3>Top 5 songs</h3>
     <ul>
       <ShowSongs songs={topSongs}/>
     </ul>
     <h3>Top 5 playlists</h3>
     <ul>
       {/* <Playlist/> */}
     </ul>
     <h3>Top 5 albums</h3>
     <ul>
       <ShowAlbums albums={topAlbums} />
     </ul>
     <h3>Top 5 artists</h3>
     <ul>
       {/* <Artist /> */}
     </ul>
    </div>
  );
}
function ShowSongs({songs}) {
  // console.log(songs)
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(songs);
  },[songs]);

  console.log(items)

  return items.map((song) => (
      <li key={song.id}>{song.songName} </li> 
  ))
}

function ShowAlbums({albums}) {
  // console.log(songs)
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(albums);
  },[albums]);

  console.log(items)

  return items.map((album) => (
    <div key={album.id}>
      <li>{album.artistName}</li> 
      {console.log(JSON.stringify(album.cover_img))}
      <img src={JSON.stringify(album.cover_img)} alt={album.albumName} />
      <img src={(album.cover_img)} alt={album.albumName} />

    </div>
  ))
}
export default Main;