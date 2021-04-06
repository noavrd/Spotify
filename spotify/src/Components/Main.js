import { React, useEffect, useState } from "react";
import albumsData from "../Jsons/albums.json";
import {Link} from "react-router-dom";

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
      <h3>Top 5 songs</h3>
      <ul className="topSongs">
        <ShowSongs songs={topSongs} />
      </ul>
      <h3>Top 5 playlists</h3>
      <ul className="playlists">
        <ShowPlayLists playlists={topPlayLists} />
      </ul>
      <h3>Top 5 albums</h3>
      <ul className="albums">
        <ShowAlbums albums={topAlbums} />
      </ul>
      <h3>Top 5 artists</h3>
      <ul className="artists">
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
      <Link
      to={{
      pathname: `/song/${song.id}`,
      }}
      >
        <li key={song.id}>{song.songName}</li>
      </Link>
  ))
}
function ShowAlbums({ albums }) {
  // console.log(songs)
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(albums);
  }, [albums]);

  return items.map((album) => (
    <Link
    to={{
    pathname: `/album/${album.id}`,
    }}
    >
      <div className="mainDiv" key={album.id}>
        <img
        src={`..${album.cover_img}`}
        alt={album.albumName}
        />
        <li className="mainLi">{album.artistName}</li>
        <li className="mainLi">{album.albumName}</li>
      </div>
    </Link>
  ));
}

function ShowArtists({ artists }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(artists);
  }, [artists]);
  return items.map((artist) => (
    <Link
    to={{
    pathname: `/artist/${artist.id}`,
    }}
    >
      <div className="mainDiv" key={artist.id}>
        <img
          src={`..${artist.cover_img}`}
          alt={artist.name}
        />
        <li className="mainLi">{artist.name}</li>
        <li className="mainLi">{artist.selectedSong}</li>
      </div>
    </Link>
  ));
}
function ShowPlayLists({ playlists }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(playlists);
  }, [playlists]);
  return items.map((playlist) => (
    <Link
    to={{
    pathname: `/playlist/${playlist.id}`,
    }}
    >
      <div className="mainDiv" key={playlist.id}>
        <img
          src={`..${playlist.cover_img}`}
          alt={playlist.name}
        />
        <li className="mainLi">{playlist.name}</li>
        <li className="mainLi">{playlist.created_at}</li>
        <li className="mainLi">{playlist.songsList}</li>
      </div>
    </Link>
  ));
}
export default Main;