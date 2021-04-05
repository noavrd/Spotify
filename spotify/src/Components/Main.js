import { React, useEffect, useState } from "react";
import albumsData from "../Jsons/albums.json";
import songsData from "../Jsons/songs.json";
import playlistsData from "../Jsons/playlist.json";
import artistsData from "../Jsons/artists.json";

function Main() {
  const [topSongs, setTopSongs] = useState([]);
  const [topAlbums, setTopAlbums] = useState([]);
  const [topPlaylist, setTopPlaylist] = useState([]);
  useEffect(() => {
    setTopSongs(songsData.sort((a,b) => ( b.views- a.views )).slice(0, 5));
    setTopAlbums(albumsData.slice(0,5));
    setTopPlaylist(playlistsData.slice(0,5));
  },[])
  console.log(topAlbums)
  console.log(topPlaylist)

  return (
    <div>
     <h1>Main</h1>
     <h3>Top 5 songs</h3>
     <ul>
       <ShowSongs songs={topSongs}/>
     </ul>
     <h3>Top 5 playlists</h3>
     <ul>
       <ShowPlaylist songs={topPlaylist}/>
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
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(songs);
  },[songs]);

  return items.map((song) => (
      <li key={song.id}>{song.songName} </li> 
  ))
}

function ShowAlbums({albums}) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(albums);
  },[albums]);

  return items.map((album) => (
    <div key={album.id}>
      <li>{album.artistName}</li> 
      <img src={`..${album.cover_img}`} alt={album.albumName} />
    </div>
  ))
}

function ShowPlaylist({playlists}) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(playlists);
  },[playlists]);

  console.log(playlists);

  // return <div></div>
  return items.map((single) => (
    <div key={single.id}>
      <li>{single.artistName}</li> 
      <img src={`..${single.cover_img}`} alt={single.albumName} />
    </div>
  ))
}
export default Main;