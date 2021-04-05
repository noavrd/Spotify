import { React, useEffect, useState } from "react";
import albumsData from "../Jsons/albums.json";
import songsData from "../Jsons/songs.json";
import playlistsData from "../Jsons/playlist.json";
import artistsData from "../Jsons/artists.json";

function Main() {
  const [topSongs, setTopSongs] = useState([]);
  const [topAlbums, setTopAlbums] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [topPlayLists, setTopPlayLists] = useState([]);

  useEffect(() => {
    setTopSongs(songsData.sort((a, b) => b.views - a.views).slice(0, 5));

    let shuffled = playlistsData.sort(() => 0.5 - Math.random());
    setTopPlayLists(shuffled.slice(0, 5));

    shuffled = albumsData.sort(() => 0.5 - Math.random());
    setTopAlbums(shuffled.slice(0, 5));

    shuffled = artistsData.sort(() => 0.5 - Math.random());
    setTopArtists(shuffled.slice(0, 5));
  }, []);



  return (
    <div>
      <h1>home</h1>
      <h3>Top 5 songs</h3>
      <ul>
        <ShowSongs songs={topSongs} />
      </ul>
      <h3>Top 5 playlists</h3>
      <ul>
        <ShowPlayLists playlists={topPlayLists} />
      </ul>
      <h3>Top 5 albums</h3>
      <ul>
        <ShowAlbums albums={topAlbums} />
      </ul>
      <h3>Top 5 artists</h3>
      <ul>
        <ShowArtists artists={topArtists} />
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
function ShowAlbums({ albums }) {
  // console.log(songs)
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(albums);
  }, [albums]);

  return items.map((album) => (
    <div key={album.id}>
      <li>{album.artistName}</li>
      <li>{album.albumName}</li>
      <img
        style={{ width: "100px" }}
        src={`..${album.cover_img}`}
        alt={album.albumName}
      />
    </div>
  ));
}

function ShowArtists({ artists }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(artists);
  }, [artists]);
  return items.map((artist) => (
    <div key={artist.id}>
      <li>{artist.name}</li>
      <img
        style={{ width: "100px" }}
        src={`..${artist.cover_img}`}
        alt={artist.name}
      />
      <li>{artist.selectedSong}</li>
    </div>
  ));
}
function ShowPlayLists({ playlists }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(playlists);
  }, [playlists]);
  return items.map((playlist) => (
    <div key={playlist.id}>
      <li>{playlist.name}</li>
      <img
        style={{ width: "100px" }}
        src={`..${playlist.cover_img}`}
        alt={playlist.name}
      />
      <li>{playlist.created_at}</li>
      <li>{playlist.songsList}</li>
    </div>
  ));
}
export default Main;